import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { City } from 'country-state-city';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cities: any[] = [];
  filteredCities: any[] = [];
  cityControl = new FormControl('');

  
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.cities = City.getAllCities();
    this.cityControl.valueChanges.subscribe(value => {
      if (value.length < 3) {
        this.filteredCities = [];
        return;
      }
      this.filteredCities = this.cities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city =>
      city.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: form.value
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.submitted = true;
          this.errorMessage = '';
          console.log('Formulário confirmado', form.value);
        } else {
          console.log('Envio cancelado pelo usuário');
        }
      });
      
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      console.log("Formulário inválido.");
    }
  }
}
