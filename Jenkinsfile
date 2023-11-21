pipeline {
  agent any
  tools {
    nodejs 'node20'
  }
  environment {
    scannerHome = tool name: 'sonar-scanner'
    PATH="${scannerHome}/bin/sonar-scanner:${env.PATH}"
  }
  stages {
    stage('Scan') {
      steps {
        withSonarQubeEnv(installationName: 'mySonar') { 
          //sh '${scannerHome}/bin/sonar-scanner'
          sh 'sonar-scanner'
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