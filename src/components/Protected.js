// components/Protected.js
import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";

import { listGolferDetails } from "../graphql/queries"
import { createGolferDetails, deleteGolferDetails} from "../graphql/mutations"

import { useAuthenticator, Heading } from '@aws-amplify/ui-react';

export function Protected() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message =
    route === 'authenticated' ? 'FIRST PROTECTED ROUTE!' : 'Loading...';

      const [golferDetails, setGolferDetails] = useState([]);
    
      useEffect(() => {
        fetchGolfers();
      }, []);
    
      async function fetchGolfers() {
        const apiData = await API.graphql({ query: listGolferDetails });
        const golferDetailsFromAPI = apiData.data.listGolferDetails.items;
        setGolferDetails(golferDetailsFromAPI);
      }
    
      async function createGolfer(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          mobileNumber: form.get('mobile'),
        };
        await API.graphql({
          query: createGolferDetails,
          variables: { input: data },
        });
        fetchGolfers();
        event.target.reset();
      }
    
      async function deleteGolfers({ id }) {
        const newGolferDetails = golferDetails.filter((golfer) => golfer.id !== id);
        setGolferDetails(newGolferDetails);
        await API.graphql({
          query: deleteGolferDetails,
          variables: { input: { id } },
        });
      }

  return (<><Heading level={1}>{message}</Heading><View className="App">
    <Heading level={1}>Golfer Details</Heading>
    <View as="form" margin="3rem 0" onSubmit={createGolfer}>
      <Flex direction="row" justifyContent="center">
        <TextField
          name="firstName"
          placeholder="firstName"
          label="firstName"
          labelHidden
          variation="quiet"
          required />
        <TextField
          name="lastName"
          placeholder="lastName"
          label="lastName"
          labelHidden
          variation="quiet"
          required />
          <TextField
          name="mobileNumber"
          placeholder="mobileNumber"
          label="mobileNumber"
          labelHidden
          variation="quiet"
          required />
        <Button type="submit" variation="primary">
          Create Golfer
        </Button>
      </Flex>
    </View>
    <Heading level={2}>Current Golfers</Heading>
    <View margin="3rem 0">
      {golferDetails.map((golfer) => (
        <Flex
          key={golfer.id || golfer.firstName}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {golfer.firstName}
          </Text>
          <Text as="span">{golfer.lastName}</Text>
          <Button variation="link" onClick={() => deleteGolfers(golfer)}>
            Delete Golfer
          </Button>
        </Flex>
      ))}
    </View>
  </View></>
  );
};