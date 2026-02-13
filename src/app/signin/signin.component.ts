import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  user = { name: '', email: '', password: '' };
  loading = false;

  constructor(private auth: AuthService) {}

  onSubmit(form: any) {
    if (form.invalid) return;

    this.loading = true;

    this.auth.register(this.user).subscribe({
      next: () => {
        alert('Registration Successful ✅');
        form.resetForm();
        this.loading = false;
      },
      error: () => {
        alert('Registration Failed ❌');
        this.loading = false;
      }
    });
  }
}
