import { Component, Input, OnInit } from '@angular/core';
import { Job, Contract, WorkingDay, Province } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-job',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-job.component.html',
  styleUrl: './card-job.component.css'
})
export class CardJobComponent implements OnInit{
  @Input() jobs: Job = {} as Job;
  @Input() listProvinces: Province[] = [];

  // contract!: Contract;
  // workingDay!: WorkingDay;
  // province!: Province;

  constructor() { }

  ngOnInit(): void {
    // if (this.jobs) {
    //   this.contract = this.jobs.id_contract;
    //   console.log(this.jobs.id_contract.contract_name);
    //   this.workingDay = this.jobs.id_workingDay;
    //   this.province = this.jobs.id_province;
    // }
  }


}
