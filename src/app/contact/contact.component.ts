import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailService } from '@core/network/services/email.service';
import { EmailMessage } from '@core/network/models';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { emailSettings, EmailSettings } from '@core/config/settings/email-settings';
import { ContactForm } from './models/contact-form.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  message: string;
  success: boolean;

  constructor(@Inject(appSettings) private appsettings: AppSettings,
    @Inject(emailSettings) private emailsettings: EmailSettings,
    private formBuilder: FormBuilder,
    private emailService: EmailService) { }

  get contactForm() {
    const contactForm: ContactForm = Object.assign({}, this.form.getRawValue());
    return contactForm;
  }

  get fullName() {
    return `${this.contactForm.firstName} ${this.contactForm.lastName}`;
  }

  get departments() {
    return this.getDepartments();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        message: ['', [Validators.required]]
      }
    );
  }

  getDepartments() {
    const departments = [
      'Information',
      'Support',
      'Other'
    ];
    return departments;
  }

  sendEmailMessage(emailMessage: EmailMessage) {
    const provider = this.emailService.getEmailProvider('sendinblue');
    this.emailService.sendEmail(emailMessage, provider).subscribe(x => {
      console.log(x);
      this.success = true;
      this.message = `Your message was sent successfully. Thanks. (${x.messageId})`;
      this.form.reset();
    });
  }

  onSubmit() {
    if (this.form.valid) {

      const emailMessage: EmailMessage = {
        sender: {
          name: this.fullName,
          email: this.contactForm.email
        },
        to: this.emailsettings.emailAddresses,
        subject: `Demo Message from ${this.appsettings.domain}`,
        htmlContent: this.contactForm.message
      };

      this.sendEmailMessage(emailMessage);
    }
  }

  onReset() {
    this.resetValues();
  }

  resetValues() {
    this.form.reset();
    this.success = false;
    this.message = '';
  }

}
