pipeline {
  agent any
  tools {
    nodejs 'node20'
    'hudson.plugins.sonar.SonarRunnerInstallation' 'sonar-scanner'
  }
  /*environment {
    NODEJS_HOME = tool name: 'node20'
    scannerHome = tool name: 'sonar-scanner'
    PATH="${NODEJS_HOME}/bin:${scannerHome}/bin/sonar-scanner:${env.PATH}"
  }*/
  stages {
    stage('Check tools versions') {
      steps {
        sh "echo ${PATH}"
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