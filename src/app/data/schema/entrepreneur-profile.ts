export interface IEntrepreneurProfile {
  objEntrepreneurProfileFormOne: ObjEntrepreneurProfileFormOne;
  objEntrepreneurProfileFormTwo: ObjEntrepreneurProfileFormTwo;
  objEntrepreneurProfileFormThree: ObjEntrepreneurProfileFormThree;
}

export interface ObjEntrepreneurProfileFormThree {
  objMedia: ObjMedia;
  objBusinessDocuments: ObjBusinessDocuments;
  objNews: ObjNews;
  objContact: ObjContact;
}

export interface ObjContact {
  strFullName: string;
}

export interface ObjNews {
  strNewsLinkUrl: string;
  strLinkText: string;
}

export interface ObjBusinessDocuments {
  arrBusinessDocuments: string;
}

export interface ObjMedia {
  strVideoLinkUrl: string;
  arrMediaImages: string;
}

export interface ObjEntrepreneurProfileFormTwo {
  objCompanyFinancials: ObjCompanyFinancials;
  objCompanyAgeSize: ObjCompanyAgeSize;
  objProductService: any[];
  objManagement: any[];
  objInvestorsLenders: ObjInvestorsLenders;
}

export interface ObjInvestorsLenders {
  strInvestorLanders: string;
  intSelectType: number;
  objPhoto: string;
  intCountry: number;
  intState: number;
  strCityName: string;
  strZipCode: string;
  strEmail: string;
  strLinkedIn: string;
  strGeneralDesc: string;
  intInvestmentAmount: string;
  intInvestmentRound: number;
  intInvestmentType: number;
  strInvestmentDate: string;
}

export interface ObjCompanyAgeSize {
  strCompFoundDate: string;
  intNoOfCurrentEmp: string;
}

export interface ObjCompanyFinancials {
  intCompRevFiscalYear: string;
  intProjectedCompRevFiscalYear: string;
  intCurrentCompRevFiscalYear: string;
}

export interface ObjEntrepreneurProfileFormOne {
  objOverview: ObjOverview;
  objSocialAccounts: ObjSocialAccounts;
  objCompanyIndustry: ObjCompanyIndustry;
  objCompanyDescription: ObjCompanyDescription;
  objGeneralFunding: ObjGeneralFunding;
  objPrivateFunding: ObjPrivateFunding;
}

export interface ObjPrivateFunding {
  intPreMoneyValuation: string;
  intInterest: string;
  intPrevFund: string;
}

export interface ObjGeneralFunding {
  strFundingGoal: string;
  strFundingRaised: string;
  strFundingCommitments: string;
  intFundingType: number;
  blnTwo: boolean;
}

export interface ObjCompanyDescription {
  strShortDesc: string;
  strLongDesc: string;
  blnOne: boolean;
}

export interface ObjCompanyIndustry {
  arrIndustries: ArrIndustry[];
}

export interface ArrIndustry {
  id: number;
  text: string;
}

export interface ObjSocialAccounts {
  strLinkedInUrl: string;
  strFacebookUrl: string;
  strTwitterUrl: string;
  strYoutubeUrl: string;
  strInstagramUrl: string;
  strBlogUrl: string;
}

export interface ObjOverview {
  strZipCode: string;
  strWebsite: string;
  strPhone: string;
  strBusinessName: string;
  strCityName: string;
  objCompanyLogo: string;
  intState: number;
  intCountry: number;
}
