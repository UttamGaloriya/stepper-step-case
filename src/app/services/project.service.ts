import { Injectable } from '@angular/core';
import { ProjectData } from '../project-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  ProjectId() {
    let project = localStorage.getItem('project')
    if (project != null) {
      let highId: number = -1;
      let projectList = JSON.parse(project)
      projectList.forEach((res: ProjectData) => {
        if (res.id > highId) {
          highId = res.id
        }
      });
      return highId + 1
    } else {
      return 1
    }
  }

  addProjectData(data: ProjectData) {
    let project = localStorage.getItem('project')
    if (project != null) {
      var projectList = JSON.parse(project);
      data.id = this.ProjectId()
      projectList.push(data)
      localStorage.setItem('project', JSON.stringify(projectList))
    } else {
      data['id'] = this.ProjectId();
      localStorage.setItem('project', JSON.stringify([data]));
    }
  }

  getUser(id: number) {
    let project = localStorage.getItem('project')
    if (project != null) {
      let projectList = JSON.parse(project)
      console.log(projectList)
      let index = projectList.findIndex((res: any) => { return res.id == id })
      console.log(index)
      return projectList[index]
    } else {
      return null
    }
  }

  updateProject(data: ProjectData, id: number) {
    data.id = id
    let project = localStorage.getItem('project')
    if (project != null) {
      var projectList = JSON.parse(project);
      let index = projectList.findIndex((res: any) => { return res.id == data.id })
      projectList.splice(index, 1, data)
      localStorage.setItem('project', JSON.stringify(projectList))
      alert('data add successful')
    }
  }

  getAllProject() {
    let projects = localStorage.getItem("project")
    if (projects != null) {
      let projectList = JSON.parse(projects)
      return projectList
    }
  }
}
