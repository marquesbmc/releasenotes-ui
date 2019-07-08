import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReleasenotesService } from 'src/app/services/releasenotes.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ResponseApi } from 'src/app/model/response-api';
import { Releasenotes } from 'src/app/model/releasenotes.model';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-nr-new',
  templateUrl: './nr-new.component.html',
  styleUrls: ['./nr-new.component.css']
})



export class NrNewComponent implements OnInit {

  shared: SharedService;

  listTeam: Team[] = [{ codigo: "", nome: "", matricula: "", papel: "" }];

  releasenotes = new Releasenotes('', '', '', '', 'ddddd', '', '', '', '', '',
    this.listTeam);

  message: {};
  classCss: {};

  nrForm = this.fb.group({
    versaoCodigoFonte: [''],
    versaoCodigoCompilado: ['']
  });

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  constructor(
    private fb: FormBuilder,
    private releaseNotesService: ReleasenotesService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }



  ngOnInit() {
    let codigo: string = this.route.snapshot.params['codigo'];
    if (codigo != undefined) {
      this.findById(codigo);

    }
  }

  findById(codigo: string) {
    this.releaseNotesService.findById(codigo).subscribe((responseApi: ResponseApi) => {
      this.releasenotes = responseApi.data;
      console.log('roda aqui')

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  name = new FormControl('');
  updateName() {
    this.name.setValue('');
  }



  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  updateNR() {
    this.nrForm.patchValue({
      versaoCodigoFonte: 'zeroo',
      versaoCodigoCompilado: 'zerro'

    });
  }

  onSubmitNR() {
    // TODO: Use EventEmitter with form value
    console.warn(this.nrForm.value);
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }



  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }
  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

}
