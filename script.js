// Replace these variables with your SonarQube server information
const sonarQubeBaseUrl = 'http://localhost:9000';
const sonarQubeToken = 'XXX';

// Function to get a list of projects based on a filter
async function getProjects(filter) {
  try {
    const response = await fetch(`${sonarQubeBaseUrl}/api/projects/search?q=${filter}`, {
      headers: {
        'Authorization': `Bearer ${sonarQubeToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data.components;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
}

// Function to change project visibility to private
async function changeVisibilityToPrivate(projectKey) {
  try {
    const response = await fetch(`${sonarQubeBaseUrl}/api/projects/update_visibility?project=${projectKey}&visibility=private`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sonarQubeToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to change project visibility: ${response.statusText}`);
    }

    console.log('Visibility changed to priavate for project:', projectKey);
  } catch (error) {
    console.error('Error changing project visibility:', error.message);
    throw error;
  }
}

// Function to add permissions to a user in a project
async function addPermissionToUserOnProject(user, permission, project) {
  try {
    const response = await fetch(`${sonarQubeBaseUrl}/api/permissions/add_user?login=${user}&projectKey=${project}&permission=${permission}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sonarQubeToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to add permission ${permission} to user ${user} on project ${project}: ${response.statusText}`);
    }

    console.log(`permission ${permission} added to user to user ${user} on project ${project}`);
  } catch (error) {
    console.error(`Failed to add permission ${permission} to user ${user} on project ${project}.`, error.message);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Replace 'your-filter' with your desired filter
    const filter = 'test';

    // Get a list of projects based on the filter
    const projects = await getProjects(filter);

    // Change visibility to public for each project and add admin user rights
    for (const project of projects) {
      await changeVisibilityToPrivate(project.key);
      await addPermissionToUserOnProject('admin', 'admin', project.key);
      await addPermissionToUserOnProject('admin', 'codeviewer', project.key);
      await addPermissionToUserOnProject('admin', 'issueadmin', project.key);
      await addPermissionToUserOnProject('admin', 'securityhotspotadmin', project.key);
      await addPermissionToUserOnProject('admin', 'scan', project.key);
      await addPermissionToUserOnProject('admin', 'user', project.key);
    }
  } catch (error) {
    console.error('Main function error:', error.message);
  }
}

// Run the main function
main();