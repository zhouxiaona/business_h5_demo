/*
 * @Author: river
 * @Date: 2020-01-13 10:07:23
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-08 13:32:45
 * @Description: 类型文件描述
 * @FilePath: \workSpace\business_h5_demo\src\type\interface.d.ts
 */
import React from 'react';
import { History, Location } from "history"
import { match } from "react-router-dom"
import { type } from 'os';

// 参数类型审查
export interface Props extends React.Props<any> {
  match: match;
  history: History;
  Location: Location;
  home: any;
  homeActions: any
}

