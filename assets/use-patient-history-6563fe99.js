import{R as r,r as f}from"./index-6f814c40.js";import{m as s,b,D as V}from"./drawer-form-with-fields-6b5cedfe.js";import{h as I,b as P,i as R,u as C}from"./patient-provider-76317411.js";import{h as q,q as S}from"./request-6a310bae.js";import{T as v,au as M,av as _,D as T,ar as x}from"./patient-helper-c5d8ffd5.js";import"./_baseToString-ba0098b0.js";import{f as H}from"./sortBy-6991f27f.js";import"./_baseClone-0c3bfcab.js";import"./sortBy-9842b21c.js";import"./_equalByTag-3aa7c076.js";import"./_baseForOwn-56487e0e.js";import"./_createSet-823d7c6f.js";const D=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,O=/^\d{5}(-\d{4})?$/;function z(e){return s.enum(["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],{required_error:e})}function k(e){return e?{alabama:"AL",alaska:"AK",arizona:"AZ",arkansas:"AR",california:"CA",colorado:"CO",connecticut:"CT",delaware:"DE",florida:"FL",georgia:"GA",hawaii:"HI",idaho:"ID",illinois:"IL",indiana:"IN",iowa:"IA",kansas:"KS",kentucky:"KY",louisiana:"LA",maine:"ME",maryland:"MD",massachusetts:"MA",michigan:"MI",minnesota:"MN",mississippi:"MS",missouri:"MO",montana:"MT",nebraska:"NE",nevada:"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY","north carolina":"NC","north dakota":"ND",ohio:"OH",oklahoma:"OK",oregon:"OR",pennsylvania:"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD",tennessee:"TN",texas:"TX",utah:"UT",vermont:"VT",virginia:"VA",washington:"WA","west virginia":"WV",wisconsin:"WI",wyoming:"WY"}[e.toLowerCase()]||e.toUpperCase():""}const y=e=>{var a,n,t,i,o;return[{label:"treating-provider",render:()=>r.createElement("div",{className:"ctw-font-medium"},"Who is the treating provider for this patient?")},{label:"Practitioner Name",field:"name",value:"",readonly:!1},[{label:"NPI",field:"npi",value:"",readonly:!1},{label:"Role",field:"role",value:"",readonly:!1}],{label:"patient-information",render:()=>r.createElement("div",null,r.createElement("div",{className:"ctw-font-medium"},"Is the patient information below correct and up-to-date?"),r.createElement("div",null,"Complete as many fields as possible to increase matching results."))},{label:"First Name",field:"firstName",value:e.firstName,readonly:!1},{label:"Last Name",field:"lastName",value:e.lastName,readonly:!1},[{label:"Date of Birth",field:"dateOfBirth",value:e.dob,readonly:!1},{label:"Gender",field:"gender",value:e.gender,readonly:!1}],{label:"Address",field:"address",value:(n=(a=e.homeAddress)==null?void 0:a.line)==null?void 0:n.join(", "),readonly:!1},{label:"City",field:"city",value:(t=e.homeAddress)==null?void 0:t.city,readonly:!1},[{label:"State",field:"state",value:k((i=e.homeAddress)==null?void 0:i.state),readonly:!1},{label:"Zip",field:"zipCode",value:(o=e.homeAddress)==null?void 0:o.postalCode,readonly:!1}],{label:"Phone",field:"phone",value:e.phoneNumber,readonly:!1},{label:"Email",field:"email",value:e.email,readonly:!1}]},B=s.object({name:s.string({required_error:"Practitioner name must be specified."}),npi:s.string({required_error:"NPI must be specified."}).length(10),role:s.enum(["Doctor","Nurse","Other"]),firstName:s.string({required_error:"First name must be specified."}),lastName:s.string({required_error:"Last name must be specified."}),dateOfBirth:s.date().min(new Date("1900"),{message:"Date of birth is invalid."}).max(new Date,{message:"Date of birth cannot be a future date."}),gender:s.enum(["-","male","female","other","unknown"]),address:s.string({required_error:"Address must be specified."}),city:s.string({required_error:"City must be specified."}),state:z("State must be specified."),zipCode:s.string({required_error:"Zip code must be specified."}).regex(O,{message:"Zip code is invalid."}),phone:s.string().regex(D,{message:"Phone number is invalid."}).optional(),email:s.string().email({message:"Email address is invalid."}).optional()});try{y.displayName="getRequestData",y.__docgenInfo={description:"",displayName:"getRequestData",props:{active:{defaultValue:null,description:"",name:"active",required:!0,type:{name:"boolean | undefined"}},contact:{defaultValue:null,description:"",name:"contact",required:!0,type:{name:"PatientContact[] | undefined"}},dob:{defaultValue:null,description:"",name:"dob",required:!0,type:{name:"string | undefined"}},age:{defaultValue:null,description:"",name:"age",required:!0,type:{name:"number | undefined"}},gender:{defaultValue:null,description:"",name:"gender",required:!0,type:{name:"string | undefined"}},maritalStatus:{defaultValue:null,description:"",name:"maritalStatus",required:!0,type:{name:"string | undefined"}},organization:{defaultValue:null,description:"",name:"organization",required:!0,type:{name:"OrganizationModel | undefined"}},use:{defaultValue:null,description:"",name:"use",required:!0,type:{name:"enum",value:[{value:"undefined"},{value:'"usual"'},{value:'"official"'},{value:'"temp"'},{value:'"nickname"'},{value:'"anonymous"'},{value:'"old"'},{value:'"maiden"'}]}},officialOrUsualIdentifier:{defaultValue:null,description:"",name:"officialOrUsualIdentifier",required:!0,type:{name:"string"}},UPID:{defaultValue:null,description:"",name:"UPID",required:!0,type:{name:"string"}},getPhoneNumber:{defaultValue:null,description:"",name:"getPhoneNumber",required:!0,type:{name:'(use?: "temp" | "old" | "home" | "work" | "mobile" | undefined) => string | undefined'}},phoneNumber:{defaultValue:null,description:"",name:"phoneNumber",required:!0,type:{name:"string | undefined"}},email:{defaultValue:null,description:"",name:"email",required:!0,type:{name:"string | undefined"}},bestHomeAddress:{defaultValue:null,description:"",name:"bestHomeAddress",required:!0,type:{name:"Address | undefined"}},homeAddress:{defaultValue:null,description:"",name:"homeAddress",required:!0,type:{name:"Address | undefined"}},bestName:{defaultValue:null,description:"",name:"bestName",required:!0,type:{name:"HumanName"}},additionalNames:{defaultValue:null,description:"",name:"additionalNames",required:!0,type:{name:"string | undefined"}},display:{defaultValue:null,description:"",name:"display",required:!0,type:{name:"string"}},firstName:{defaultValue:null,description:"",name:"firstName",required:!0,type:{name:"string"}},fullName:{defaultValue:null,description:"",name:"fullName",required:!0,type:{name:"string"}},lastName:{defaultValue:null,description:"",name:"lastName",required:!0,type:{name:"string | undefined"}},nickname:{defaultValue:null,description:"",name:"nickname",required:!0,type:{name:"string | undefined"}},prefix:{defaultValue:null,description:"",name:"prefix",required:!0,type:{name:"string | undefined"}},suffix:{defaultValue:null,description:"",name:"suffix",required:!0,type:{name:"string | undefined"}},resource:{defaultValue:null,description:"",name:"resource",required:!0,type:{name:"Patient"}},includedResources:{defaultValue:null,description:"",name:"includedResources",required:!1,type:{name:"ResourceMap"}},revIncludes:{defaultValue:null,description:"",name:"revIncludes",required:!1,type:{name:"Resource[]"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},isSummaryResource:{defaultValue:null,description:"",name:"isSummaryResource",required:!0,type:{name:"boolean"}},resourceType:{defaultValue:null,description:"",name:"resourceType",required:!0,type:{name:"string"}},resourceTypeTitle:{defaultValue:null,description:"",name:"resourceTypeTitle",required:!0,type:{name:"string"}},getBasicResourceByAction:{defaultValue:null,description:"",name:"getBasicResourceByAction",required:!0,type:{name:"(profileAction: string) => Basic | undefined"}},toString:{defaultValue:null,description:"",name:"toString",required:!1,type:{name:"() => string"}}}}}catch{}const L=async(e,a,n)=>{const t=`${b(e.env)}/patient-history/patient/${a}/refresh?consent=1`;try{return await(await q(t,{method:"POST",headers:{Authorization:`Bearer ${e.authToken}`,"practitioner-npi":n.npi,"practitioner-role":n.role.toLocaleLowerCase(),"practitioner-name":n.name,...e.contextBuilderId&&{"Zus-Account":e.contextBuilderId}}})).json()}catch(i){throw v.logError(i,`Error scheduling patient history job with id of ${a}`),Error(`Error scheduling patient history job with id of ${a}`)}},g=({patient:e,header:a,isOpen:n,onClose:t,setClinicalHistoryExists:i})=>{const o=I(e),u=async(l,c)=>{try{await o(l)}catch(d){const{requestErrors:p,responseIsSuccess:E}=M(d);return E?(v.logError(d,"Failed to save patient data."),new Error("Failed to save patient data.")):new Error(p.join(","))}const A=await c(),m=await L(A,e.id,l);if("errors"in m){const d=[m.errors.map(p=>p.details)];return new Error(d.join(","))}return await S.invalidateQueries([_]),i(!0),m};return r.createElement(V,{header:a,title:"Request Records",action:u,data:y(e),schema:B,isOpen:n,onClose:t})};try{g.displayName="PatientHistoryRequestDrawer",g.__docgenInfo={description:"",displayName:"PatientHistoryRequestDrawer",props:{onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},header:{defaultValue:null,description:"",name:"header",required:!1,type:{name:"ReactNode"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},patient:{defaultValue:null,description:"",name:"patient",required:!0,type:{name:"PatientModel"}},setClinicalHistoryExists:{defaultValue:null,description:"",name:"setClinicalHistoryExists",required:!0,type:{name:"Dispatch<SetStateAction<boolean | undefined>>"}}}}}catch{}const h=({className:e,height:a})=>r.createElement("svg",{viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",className:e,height:a},r.createElement("path",{d:"M10 18C14.4062 18 18 14.4375 18 10C18 5.59375 14.4062 2 10 2C5.5625 2 2 5.59375 2 10C2 14.4375 5.5625 18 10 18ZM10 6C10.4062 6 10.75 6.34375 10.75 6.75V10.25C10.75 10.6875 10.4062 11 10 11C9.5625 11 9.25 10.6875 9.25 10.25V6.75C9.25 6.34375 9.5625 6 10 6ZM11 13C11 13.5625 10.5312 14 10 14C9.4375 14 9 13.5625 9 13C9 12.4688 9.4375 12 10 12C10.5312 12 11 12.4688 11 13Z"}));try{h.displayName="ErrorIcon",h.__docgenInfo={description:"",displayName:"ErrorIcon",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}}}}}catch{}const w=({className:e,height:a})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:e,height:a},r.createElement("path",{d:`M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 
    416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48
     21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7
      18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 
      75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z`}));try{w.displayName="ProgressIcon",w.__docgenInfo={description:"",displayName:"ProgressIcon",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}}}}}catch{}const N=({status:e,date:a})=>{switch(e){case"initialize":case"in_progress":return r.createElement("div",{className:"ctw-alert-bg ctw-rounded-md ctw-bg-caution-bg"},r.createElement(w,{className:"ctw-h-5 ctw-flex-none ctw-fill-caution-icon"}),r.createElement("div",{className:"ctw-text-caution-message"},"In Progress - request received ",T(a)));case"error":return r.createElement("div",{className:"ctw-alert-bg ctw-rounded-md ctw-bg-error-bg"},r.createElement(h,{className:"ctw-h-5 ctw-flex-none ctw-fill-error-main"}),r.createElement("div",{className:"ctw-font-medium ctw-text-error-text"},"There was an error fetching some or all records for this patient.",r.createElement("div",{className:"ctw-font-normal ctw-text-error-text"},"Contact your organization’s technical support if this issue persists for more than 24 hours.")));case"done":default:return null}};try{N.displayName="PatientHistoryStatus",N.__docgenInfo={description:"",displayName:"PatientHistoryStatus",props:{status:{defaultValue:null,description:"",name:"status",required:!1,type:{name:"string"}},date:{defaultValue:null,description:"",name:"date",required:!1,type:{name:"string"}}}}}catch{}function ae(){const{openDrawer:e}=P(),{getPatient:a}=R(),n=U(),[t,i]=f.useState(),[o,u]=f.useState();return f.useEffect(()=>{async function l(){n.isLoading||i(n.data)}u(l())},[a,n.isLoading,n.data]),{openHistoryRequestDrawer:async()=>{await o;const l=await a();e({component:c=>r.createElement(g,{setClinicalHistoryExists:()=>{},header:r.createElement(r.Fragment,null,r.createElement(N,{status:t==null?void 0:t.status,date:t==null?void 0:t.dateCreated}),r.createElement("div",{className:"ctw-pt-0 ctw-text-base"},"Request patient clinical history from 70K+ providers across the nation. No changes will be made to your patient record.")),patient:l,...c})})},lastRetrievedAt:t==null?void 0:t.lastRetrievedAt,lastStatus:t==null?void 0:t.status,dateCreatedAt:t==null?void 0:t.dateCreated}}async function F(e,a){const n=`${b(e.env)}/patient-history/messages?patient-id=${a}`;try{const i=await(await q(n,{headers:{Authorization:`Bearer ${e.authToken}`,...e.contextBuilderId&&{"Zus-Account":e.contextBuilderId}}})).json();return Object.values(i.data)}catch(t){throw x("Failed fetching patient refresh history messages",t)}}function U(){return C(_,[],async(e,a)=>{var n,t;try{const i=await F(e,a.id),o=H(i,{_messages:[{status:"done"}]});return{lastRetrievedAt:o==null?void 0:o._createdAt,status:(n=i[0])==null?void 0:n.status,dateCreated:(t=i[0])==null?void 0:t._createdAt}}catch(i){throw v.logError(i,"Failed fetching patient history details"),new Error(`Failed fetching patient history details for patient: ${i}`)}})}export{ae as u};
