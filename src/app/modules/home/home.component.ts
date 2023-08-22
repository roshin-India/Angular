import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from '@data/service/project.service';
import { Project } from '@data/schema/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  projects$: Observable<Project[]> = this.projectService.getAll();

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectService
  ) {}
}
