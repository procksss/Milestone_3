import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer,CDBBox } from 'cdbreact';

export default function Footer() {


      return (
        <footer>
        <CDBFooter className="shadow">
          <CDBBox
            display="flex"
            justifyContent="between"
            alignItems="center"
            className="mx-auto py-4 flex-wrap"
            style={{ width: '80%' }}
          >
            <CDBBox display="flex" alignItems="center">
              <a href="/" className="d-flex align-items-center p-0 text-dark">
                <img
                  alt="logo"
                  src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                  width="30px"
                />
                <span className="ml-4 h5 mb-0 font-weight-bold">Pratyush</span>
              </a>
              <small className="ml-2">&copy; PratyushRay, 2022. All rights reserved.</small>
            </CDBBox>
            <CDBBox display="flex">
              <CDBBtn flat color="dark" className="p-2" href="https://www.facebook.com/pratyush.rock.5/" target="_blank">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3 p-2" href="https://twitter.com/pratyus10865807" target="_blank" >
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2" href="https://www.instagram.com/dark_room24/" target="_blank" >
                <CDBIcon fab icon="instagram"  />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
        </CDBFooter>
        </footer>
      );
    }