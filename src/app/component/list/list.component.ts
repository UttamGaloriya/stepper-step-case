import { Component } from '@angular/core';
import { ProjectData } from 'src/app/project-data';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  projects!: ProjectData[]
  constructor(private projectService: ProjectService) {
  }
  ngOnInit() {
    this.projects = this.projectService.getAllProject()
  }
}
