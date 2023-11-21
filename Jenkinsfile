pipeline {
  agent any
  tools {
    // Usamos la instalción de node que hemos definido antes
    // Esto además va a hacer que "node" esté en el PATH
    nodejs 'node20'
  }
  environment {
    scannerHome = tool name: 'sonar-scanner'
  }
  stages {
    stage('Scan') {
      steps {
        withSonarQubeEnv(installationName: 'mySonar') { 
          sh '${scannerHome}/bin/sonar-scanner'
        }
      }
    }
    stage('Wait for quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }  
      }
    }
  }
}