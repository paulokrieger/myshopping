import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      /**    .where("quantity", "<", 5) //Filtrando consultas  */
      /**     .limit(3)   Limite de retorno, paginação etc  */
      /**.orderBy('description', 'asc') Ordenação da lista  */
      .orderBy("description")
      // .startAt(2)
      // .endAt(5) //filtra a quantidade entre 2 a 5
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });
    return () => subscribe();
  }, []);

  /**Leitura unica de um documento */
  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .doc("OCBbL2AeX3fvXGWayNME")
  //     .get()
  //     .then((response) => {
  //       console.log(response.data());
  //     });
  // }, []);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
