import React, { useEffect, useState } from "react";
import styles from "./style/index.module.scss";
import { View, Text, Image, Radio } from "@tarojs/components";
import { Root } from "../../core/root";
export default function main(props) {
  useEffect(() => {
    return () => {};
  }, []);
  const { tableData } = props;
  return (
    <Root hashData={styles}>
      <View className={styles.table}>
        <table>
          <thead className={styles.thead}>
            <tr>
              {tableData.tableHeader.map((item, index) => {
                return (
                  <th
                    key={`head-${index}`}
                    style={{
                      width: item.tWidth,
                    //   textAlign: item.align,
                      backgroundColor: item.bgcolor,
                    //   color:item.color
                    }}
                  >
                    {item.tName}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {tableData.dataList.map((item, index) => {
              return (
                <tr key={`dataSource-${index}`}>
                  {item.map((child, childIndex) => {
                    return (
                      <td
                        key={`dataSource-td-${childIndex}`}
                        style={{
                          textAlign: tableData.tableHeader[childIndex].align,
                          color: tableData.tableHeader[childIndex].color
                        }}
                      >
                        {child}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* <tr>
              {tableData.tableLastColumn.map((item, index) => {
                return (
                  <td key={`lastColumn-${index}`} >
                    {item.tValue}
                  </td>
                );
              })}
            </tr> */}
          </tbody>
        </table>
      </View>
    </Root>
  );
}
