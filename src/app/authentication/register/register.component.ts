import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  minPasswordLength = environment.minimumPasswordLength;
  registerForm = new FormGroup({});

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ],
        asyncValidators: [this.emailValidator()],
        updateOn: 'blur'
      }),
      password: new FormControl('', [
        Validators.minLength(this.minPasswordLength),
        Validators.required
      ]),
      passwordCheck: new FormControl('', [
        Validators.minLength(this.minPasswordLength),
        Validators.required
      ]),
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      street: new FormControl('', [
        Validators.required
      ]),
      housenumber: new FormControl('', [
        Validators.required
      ]),
      postalcode: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
    }, this.equalValueValidator('password', 'passwordCheck'));
  }

  validClasses(fieldName: string): any {
    const field = this.registerForm.controls[fieldName];
    const valid = field.valid;
    const touched = field.touched;
    return { 'is-invalid': !valid && touched, 'is-valid': valid };
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.emailExists(control.value).pipe(
        map((response: any) => {
          return response.content.exists ? {in_use: true} : null;
        })
      );
    };
  }

  equalValueValidator(targetKey: string, toMatchKey: string): ValidationErrors {
    return (group: FormGroup): ValidationErrors | null => {
      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];
      const isMatch = target.value === toMatch.value;
      // set equal value error on dirty controls
      if (!isMatch) {
        toMatch.setErrors({equalValue: targetKey});
        const message = targetKey + ' != ' + toMatchKey;
        return {equalValue: message};
      }
      if (isMatch && toMatch.hasError('equalValue')) {
        toMatch.setErrors(null);
      }

      return null;
    };
  }

  onSubmit(): void {
    if (!this.registerForm.valid) { return; }

    this.authService.register(this.registerForm.getRawValue())
      .subscribe(response => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }, error => {
        alert('Something went wrong, please try again later')
      });
  }

}
