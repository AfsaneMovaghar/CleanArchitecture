import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, Gender } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  userEntity=<User>{gender:Gender.Male};
  userId=0;
//userForm:FormGroup;
  constructor(
   private fb: FormBuilder,
    private apiService: UserService,
    private route: ActivatedRoute
  ) {

    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });
    // this.userForm = this.fb.group({
    //   name: ['', [Validators.required, Validators.minLength(3)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', [Validators.pattern(/^[0-9]{10,11}$/)]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
    if(this.userId>0)
      this.getById();
   }

getById(){
this.apiService.getUser(this.userId).subscribe({
  next: (response) => {
    
    this.userEntity=response.data;
  },
  error: (err) => {
    this.errorMessage = 'خطا در ثبت اطلاعات: ' + (err.error?.message || err.message);
    this.isSubmitting = false;
  },
  complete: () => {
    this.isSubmitting = false;
  }});
}

  onSubmit() {
    //if (this.userForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.apiService.registerUser(this.userEntity).subscribe({
      next: (response) => {
        this.successMessage = 'ثبت نام با موفقیت انجام شد';
        this.userEntity=<User>{};
      },
      error: (err) => {
        this.errorMessage = 'خطا در ثبت اطلاعات: ' + (err.error?.message || err.message);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}