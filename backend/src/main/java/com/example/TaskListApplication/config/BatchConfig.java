package com.example.TaskListApplication.config;

import com.example.TaskListApplication.model.ArchivedTask;
import com.example.TaskListApplication.model.Task;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import javax.sql.DataSource;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    private final DataSource dataSource;
    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;

    public BatchConfig(DataSource dataSource, JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        this.dataSource = dataSource;
        this.jobRepository = jobRepository;
        this.transactionManager = transactionManager;
    }

    // itemReader permettant de lire les tâches avec le status "Terminé"
    @Bean
    public JdbcCursorItemReader<Task> itemReader() {
        JdbcCursorItemReader<Task> reader = new JdbcCursorItemReader<>();
        reader.setDataSource(dataSource);
        reader.setSql("SELECT * FROM task WHERE status = 'Terminé'");
        reader.setRowMapper(new BeanPropertyRowMapper<>(Task.class));
        return reader;
    }

    /* itemProcessor permettant de créer une tâche archivée contenant
    les informations de la tâche lue auparavant + la date d'archivage */
    @Bean
    public ItemProcessor<Task, ArchivedTask> itemProcessor() {
        return task -> {
            ArchivedTask archivedTask = new ArchivedTask();
            archivedTask.setTitle(task.getTitle());
            archivedTask.setDescription(task.getDescription());
            archivedTask.setStatus(task.getStatus());
            archivedTask.setArchivedDate(Date.valueOf(LocalDate.now()));
            return archivedTask;
        };
    }

    // itemWriter permettant d'ajouter notre tâche archivée dans la table archived_task
    @Bean
    public JdbcBatchItemWriter<ArchivedTask> itemWriter() {
        JdbcBatchItemWriter<ArchivedTask> writer = new JdbcBatchItemWriter<>();
        writer.setDataSource(dataSource);

        // On ajoute que si la tâche n'existe pas déjà dans la table archived_task
        writer.setSql("INSERT OR IGNORE INTO archived_task (title, description, status, archived_date) " +
                "VALUES (:title, :description, :status, :archivedDate);");
        writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>());
        return writer;
    }

    // Création d'un StepBuilder et un JobRepository pour gérer la persistance de la transaction
    @Bean
    public Step transaction() {
        StepBuilder stepBuilder = new StepBuilder("transaction", jobRepository);
        return stepBuilder.<Task, ArchivedTask>chunk(10, transactionManager) // Taille de chunk par 10 pour le traitement par lot
                .reader(itemReader()) // On regarde si la tâche a un status à "Terminé"
                .processor(itemProcessor()) // Si c'est le cas, on crée une tâche archivée avec les mêmes informations + la date
                .writer(itemWriter()) // On insère dans la table archived_task
                .build();
    }

    // Création d'un JobBuilder et un JobRepository pour gérer la persistance du job
    @Bean
    public Job archiveTaskJob() {
        JobBuilder jobBuilder = new JobBuilder("archiveTaskJob", jobRepository);
        return jobBuilder.start(transaction()).build(); // On lance le job avec la transaction configurée avant
    }
}
