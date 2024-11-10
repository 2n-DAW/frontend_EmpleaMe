import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services';
import { ProvinceService, WorkingDayService, CategoryService, ContractService } from '../../../core/services';
import { Category, Contract, WorkingDay, Province } from '../../../core/models';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  jobForm: FormGroup;
  isSubmitting = false;

  // Arrays para almacenar las opciones de cada desplegable
  listCategories: Category[] = [];
  listContracts: Contract[] = [];
  listWorkingDays: WorkingDay[] = [];
  listProvinces: Province[] = [];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private provinceService: ProvinceService,
    private workingDayService: WorkingDayService,
    private categoryService: CategoryService,
    private contractService: ContractService
  ) {
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      id_contract: ['', Validators.required],
      id_workingDay: ['', Validators.required],
      id_province: ['', Validators.required],
      id_cat: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      img: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Llama a los métodos para obtener las opciones del servidor
    this.getListForCategory();
    this.getListForContract();
    this.getListForWorkingDay();
    this.getListForProvince();
  }


  // Carga datos en filtro Categorías
  getListForCategory() {
    this.categoryService.all_categories_select().subscribe((data: any) => {
      this.listCategories = data.categories;
    });
  }

  // Carga datos en filtro Jornadas
  getListForWorkingDay() {
    this.workingDayService.getAllWorkingDays().subscribe((data: any) => {
      this.listWorkingDays = data.workingDays;
    });
  }

  // Carga datos en filtro Provincias
  getListForProvince() {
    this.provinceService.getAllProvinces().subscribe((data: any) => {
      this.listProvinces = data.provinces;
    });
  }

  getListForContract() {
    this.contractService.getAllContracts().subscribe((data: any) => {
      this.listContracts = data.contracts;
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.isSubmitting = true;
      const jobData = this.jobForm.getRawValue();
      console.log('Enviando datos al servidor:', jobData);

      this.jobService.createJob(jobData).subscribe(
        (data: any) => {
          console.log('Trabajo creado exitosamente:', data);
          this.isSubmitting = false;
        },
        (err: any) => {
          console.error('Error al crear el trabajo:', err);
          this.isSubmitting = false;
        }
      );
    } else {
      this.jobForm.markAllAsTouched();
      console.log('Formulario inválido. Corrige los errores.');
    }
  }

  isFieldInvalid(fieldName: string): boolean | null {
    const field = this.jobForm.get(fieldName);
    return field && field.invalid && field.touched;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.jobForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (field?.hasError('maxlength')) {
      return 'No puede superar los 500 caracteres';
    } else if (field?.hasError('min')) {
      return 'El salario debe ser un valor positivo';
    }
    return '';
  }












}  