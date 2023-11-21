pipeline {
  agent any
  environment {
    NODEJS_HOME = tool name: 'node20'
    scannerHome = tool name: 'sonar-scanner'
    PATH="${env.NODEJS_HOME}/bin:${scannerHome}/bin/sonar-scanner:${env.PATH}"
  }
  stages {
    stage('Check tools versions') {
      steps {
        sh 'sonar-scanner --version'
        sh 'node --version'
      }
    }
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