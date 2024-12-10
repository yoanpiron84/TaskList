package com.example.TaskListApplication;

import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class TaskListApplication {

    @Autowired
    private JobLauncher jobLauncher; // Lanceur de job

    @Autowired
    private Job archiveTaskJob; // Job de la configuration

    public static void main(String[] args) {
        SpringApplication.run(TaskListApplication.class, args);
    }

    // Fonction pour lancer le job
    public void runBatchJob() {
        try {

            // On encode les paramètres avec Base64
            String timeParam = Base64.getEncoder().encodeToString(String.valueOf(System.currentTimeMillis()).getBytes());

            // Création des paramètres du job
            JobParameters jobParameters = new JobParametersBuilder()
                    .addString("time", timeParam)  // On utilise la version encodée en Base64
                    .toJobParameters();

            // Lancement du job avec les paramètres
            JobExecution execution = jobLauncher.run(archiveTaskJob, jobParameters);
            //JobExecution execution = jobLauncher.run(archiveTaskJob, new org.springframework.batch.core.JobParameters()); // Cette version cause une erreur de paramètres mal convertis
            System.out.println("Etat du job: " + execution.getStatus());
            String statusJob = execution.getStatus().toString();
            if(statusJob == "FAILED"){
                System.out.println("Le job ne s'est pas éxécuté correctement");
            } else{
                System.out.println("Le job s'est éxécuté correctement");
            }
        } catch (Exception e) {
            System.out.println("Le job a échoué");
            e.printStackTrace();
        }
    }

}
