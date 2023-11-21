pipeline {
  agent any
  tools {
    nodejs 'node20'
    'hudson.plugins.sonar.SonarRunnerInstallation' 'sonar-scanner'
  }
  environment {
    scannerHome = tool name: 'sonar-scanner'
    PATH="${scannerHome}/bin/sonar-scanner:${env.PATH}"
  }
  stages {
    stage('Check tools versions') {
      steps {
        sh 'node --version'
        sh "echo ${PATH}"
        sh '${scannerHome}/bin/sonar-scanner'
        sh 'sonar-scanner --version'
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