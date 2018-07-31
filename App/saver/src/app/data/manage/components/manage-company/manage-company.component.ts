import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from "../../../service/service_company/company.service";
import {Company} from "../../../../models/Company";
import {AddViewsService} from "../../addViews/service_addViews/addViews.service";
import {Category} from "../../../../models/Category";
import {CategoryService} from "../../../categories/service_category/category.service";

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {

   @Input() company: Company = null;

  companies: Company[] = null;

  categories: Category[] = [];

  constructor(protected addView: AddViewsService,
              private serviceCompanies: CompanyService,
              private serviceCategories: CategoryService) { }

  ngOnInit() {
    this.company = this.addView.getCompany();
    this.companies = this.getCompanies();

    this.getCategories();
  }


  private getCategories(){
    this.categories = [];

    this.serviceCategories.getCategories().subscribe(categories => {
      for (let category of categories){
        this.categories.push(category);
      }
    });
  }

  private getCompanies() {

    let data: Company[] = [];

    this.serviceCompanies.getCompanies().subscribe(companies => {
      // loop trough all the categories
      for (let company of companies) {
        data.push(company);

        if(company.categoryFk != 0){

        }
      }
    });
    return data;
  }

  submitForm():void {
    this.serviceCompanies.addCompany(this.company);
  }

}
