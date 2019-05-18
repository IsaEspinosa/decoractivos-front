import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
      name: ["", Validators.required],
      document_type: [null, Validators.required],
      document_number: ["", Validators.required],
      company: [""],
      company_nit: [""],
      max_sessions: [
        "",
        [Validators.required, Validators.min(1), Validators.pattern(/\d+/)]
      ],
      expire_date: ["", [Validators.required]]
    });

    this.fs = new FormService(this.userForm, this);
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    console.log(this.userForm)
    if (this.userForm.invalid) {
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append("name", this.userForm.get("name").value);
    input.append("preview", this.userForm.get("preview").value);
    input.append(
      "environment_type_id",
      this.userForm.get("environment_type_id").value.environment_type_id
    );

    return

    return this.userService
      .post(input)
      .toPromise()
      .then(user =>
        this.router.navigate([`/admin/ambientes/${user.username}/editar`])
      )
      .catch(response => this.fs.manageErrors(response));
  }
}

export const CreateUserInternalComponents = [CreateUserPageComponent];
