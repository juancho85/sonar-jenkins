pipeline {
  agent any
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
  }
}