/**
 * Copyright 2019 Splunk, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"): you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
      margin: 0;
      font-family: Helvetica, Arial, sans-serif;
      font-size: x-large;
      //background-image: linear-gradient(-45deg, #F69B1E, #E61088);
  }
`;

const center = `
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Center = styled.div`
    ${center}
    height: 100vh;
`;

export const Err = styled.div`
    ${center}
    color: rgb(200, 100, 80);
`;

export const List = styled.ul`
`;

export const ListItem = styled.li`
    display: block;
    margin: 2.0em 15vw 2.0em 15vw;
`;