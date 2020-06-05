/*
 * @Author: river
 * @Date: 2020-01-13 10:07:23
 * @LastEditors: tankswift
 * @LastEditTime: 2020-06-05 13:39:20
 * @Description: 类型文件描述
 * @FilePath: \workSpace\h5_demo\src\type\interface.d.ts
 */
import React from 'react';
import { History, Location } from "history"
import { match } from "react-router-dom"
import { AnswerType } from './data'
import { type } from 'os';
import { myGoodsType } from "../../../fifteen/src/type/interface";

// 参数类型审查
export interface Props extends React.Props<any> {
  match: match;
  history: History;
  Location: Location;
  home: any;
  homeActions: any
}

