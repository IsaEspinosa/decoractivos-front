import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { FormService } from "../../../../common/services/forms.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { ClientUser } from "../../../../common/models/user";
import { UserService } from "../../../../common/services/user.service";

@Component({
  selector: "app-create-user-page",
  templateUrl: "./users-create.component.html",
  styleUrls: ["./users-create.component.scss"]
})
export class CreateUserPageComponent implements OnInit {
  public user: ClientUser = new ClientUser();
  public userForm: FormGroup;
  public isLoading = false;
  public submitted = false;
  public fs: FormService;
  public currentDate = new Date();

  public documentTypes = [
    { label: "C.C. (Cédula de Ciudadanía)", value: "CC" },
    { label: "C.E. (Cédula de Extranjería)", value: "CE" },
    { label: "NIT (Número Identificación Tributaria)", value: "NIT" },
    { label: "PP (Pasaporte)", value: "PP" },
    { label: "IDC (Identificador Único de Cliente)", value: "IDC" },
    { label: "D.E. (Documento de Identificación Extranjero)", value: "DE" }
  ];

  constructor(
    protected userService: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ["", [Validators.required, this.validateEmptyField]],
      document_type: [null, Validators.required],
      document_number: ["", [Validators.required, this.validateEmptyField]],
      company: ["", this.validateEmptyField],
      company_nit: ["", Validators.pattern(/\d+/)],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      max_sessions: [
        "",
        [Validators.required, Validators.min(1), Validators.pattern(/\d+/)]
      ],
      expire_date: ["", [Validators.required]]
    });

    this.fs = new FormService(this.userForm, this);
  }

  validateEmptyField(control: FormControl) {
    if (control.value && control.value.trim().length === 0)
      return { pattern: true };
    return null;
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.userForm.invalid) {
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append("name", this.userForm.get("name").value);
    input.append("email", this.userForm.get("email").value);
    input.append("username", this.userForm.get("email").value);
    input.append("document_type", this.userForm.get("document_type").value);
    input.append("document_number", this.userForm.get("document_number").value);
    input.append("company", this.userForm.get("company").value);
    input.append("company_nit", this.userForm.get("company_nit").value);
    input.append("expire_date", this.userForm.get("expire_date").value);
    input.append("max_sessions", this.userForm.get("max_sessions").value);

    return this.userService
      .post(input)
      .toPromise()
      .then(user => this.router.navigate([`/admin/usuarios/`]))
      .catch(response => this.fs.manageErrors(response));
  }
}

export const CreateUserInternalComponents = [CreateUserPageComponent];
