import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  userProfile: (data: any) =>
    axios({
      method: 'get',
      url: `${API_URL}/membership-service/1.2.0/users/me`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then((res) => {
      return res;
    }).catch((error) => {
      console.log('error', error)
      toast.error(error.message);
    }),

  getInvoices: (data: any) =>
    axios({
      method: 'get',
      url: `${API_URL}/invoice-service/1.0.0/invoices`,
      params: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Org-token': localStorage.getItem('org_token'),
      }
    }).then((res) => {
      return res?.data;
    }).catch((error) => {
      console.log('error', error)
      toast.error(error.message);
    }),

  postInvoice: (data: any) =>
    axios({
      method: 'post',
      url: `${API_URL}/invoice-service/2.0.0/invoices`,
      data: {
        "invoices": [
          {
            "bankAccount": {
              "bankId": "",
              "sortCode": "09-01-01",
              "accountNumber": "12345678",
              "accountName": "John Terry"
            },
            "customer": {
              "firstName": "Nguyen",
              "lastName": "Dung 2",
              "contact": {
                "email": "nguyendung2@101digital.io",
                "mobileNumber": "+6597594971"
              },
              "addresses": [
                {
                  "premise": "CT11",
                  "countryCode": "VN",
                  "postcode": "1000",
                  "county": "hoangmai",
                  "city": "hanoi"
                }
              ]
            },
            "documents": [
              {
                "documentId": "96ea7d60-89ed-4c3b-811c-d2c61f5feab2",
                "documentName": "Bill",
                "documentUrl": "http://url.com/#123"
              }
            ],
            "invoiceReference": `#${data.reference}`,
            "invoiceNumber": "INV1222",
            "currency": "GBP",
            "invoiceDate": `${data.date.slice(0, -6)}`,

            "dueDate": "2021-06-04",

            "description": `#${data.description}`,
            "customFields": [
              {
                "key": "invoiceCustomField",
                "value": "value"
              }
            ],
            "extensions": [
              {
                "addDeduct": "ADD",
                "value": 10,
                "type": "PERCENTAGE",
                "name": "tax"
              },
              {
                "addDeduct": "DEDUCT",
                "type": "FIXED_VALUE",
                "value": 10.00,
                "name": "discount"
              }
            ],
            "items": [
              {
                "itemReference": "itemRef",
                "description": "Honda RC150",
                "quantity": 1,
                "rate": 1000,
                "itemName": "Honda Motor",
                "itemUOM": "KG",
                "customFields": [

                  {

                    "key": "taxiationAndDiscounts_Name",
                    "value": "VAT"

                  }
                ],
                "extensions": [

                  {

                    "addDeduct": "ADD",
                    "value": 10,
                    "type": "FIXED_VALUE",
                    "name": "tax"
                  },
                  {
                    "addDeduct": "DEDUCT123123",
                    "value": 10,
                    "type": "PERCENTAGE",
                    "name": "tax"
                  }
                ]
              }
            ]
          }
        ]
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Org-token': localStorage.getItem('org_token'),
      }
    }).then((res) => {
      return res;
    }).catch((error) => {
      console.log('error', error)
      toast.error(error.message);
    }),
}