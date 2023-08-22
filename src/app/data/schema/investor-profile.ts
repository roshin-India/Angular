export interface IInvestorProfile {
  objInvestorProfileFormOne: ObjInvestorProfileFormOne;
  objInvestorProfileFormTwo: ObjInvestorProfileFormTwo;
  objInvestorProfileFormThree: ObjInvestorProfileFormThree;
}
export interface ObjInvestorProfileFormThree {
  objPortfolio: ObjPortfolio[];
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

export interface ObjPortfolio {
  strCompanyName: string;
  objCompanyLogo?: string;
  strCompanyWebsite: string;
  strCompanyRole: number;
}

export interface ObjInvestorProfileFormTwo {
  objIndustriesOfInterest: ObjIndustriesOfInterest;
  objInvestmentInterest: ObjInvestmentInterest;
  objInvestmentAcivities: ObjInvestmentAcivities;
  objManagement: ObjManagement[];
}

export interface ObjManagement {
  strFullName: string;
  strLinkedInUrl: string;
  strDesignation: string;
  strEmail: string;
  objPhoto?: string;
  strOverviewManagement: string;
}

export interface ObjInvestmentAcivities {
  intNoBuisinessReviewed: string;
  intNoBuisinessInvested: string;
  intToalCapitalInvested: string;
}

export interface ObjInvestmentInterest {
  intPrimaryTypeCapital: number;
  intExpRateOfReturnPerYear: string;
  intMinValueOfInterest: number;
  intMaxValueOfInterest: number;
}

export interface ObjIndustriesOfInterest {
  arrIndustriesOfInterest: ArrIndustriesOfInterest[];
}

export interface ArrIndustriesOfInterest {
  id: number;
  text: string;
}

export interface ObjInvestorProfileFormOne {
  objOverview: ObjOverview;
  objSocialAccounts: ObjSocialAccounts;
  objBuisinessOverview: ObjBuisinessOverview;
  objInvestorAccreditation: ObjInvestorAccreditation;
  objFunding: ObjFunding;
}

export interface ObjFunding {
  intMinReveneuStage: number;
  intMaxReveneuStage: number;
  intMinInvestmentStage: number;
  intMaxInvestmentStage: number;
}

export interface ObjInvestorAccreditation {
  blnOne: boolean;
  blnTwo: boolean;
  blnThree: boolean;
  blnFour: boolean;
}

export interface ObjBuisinessOverview {
  strBuisinessOverview: string;
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
  strFirmName: string;
  strCityName: string;
  objLogo: string;
  intState: number;
  intNoOfInvestorFirm: string;
  intInvestorMemberType: number;
  intCountry: number;
}
