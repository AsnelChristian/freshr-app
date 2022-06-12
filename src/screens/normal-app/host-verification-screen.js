import { useEffect, useContext, useState } from "react";
import styled, {useTheme} from 'styled-components/native';

import { SafeArea } from "../../components/utils/safearea.component";
import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Checkbox } from "react-native-paper";
import { View } from "react-native";
import {
  ActionButton, ButtonContainer,
} from "../../components/button/process-action-button.component";
import { AuthContext } from "../../providers/auth/auth.context";
import { LoadingScreen } from "../loading.screen";

const Container = styled.ScrollView`
  flex: 1;
  padding: 30px 16px 16px;
  background-color: #fafafa;
`

const ConditionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  background-color: white;
  padding: 16px;
  border-radius: 3px;
`

export const HostVerificationScreen = ({navigation}) => {
  const conditionsObj = [{
    id: 1,
    description: "Condition host one",
    status: false
  }, {
    id: 2,
    description: "Condition host two",
    status: false
  }, {
    id: 3,
    description: "Condition host three",
    status: false
  }]

  const theme = useTheme();
  const [conditions, setConditions] = useState([...conditionsObj])
  const [allConditionsChecked, setAllConditionsChecked] = useState(false);
  const {isLoading, error, onBecomeHost} = useContext(AuthContext);
  const [host, setHost] = useState(null)


  const updateCondition = (index) => {
    setConditions(old => {
      const condition = {...old[index]};
      condition.status = !condition.status;
      const newConditions = [...old];
      newConditions[index] = condition;
      return newConditions;
    })
  }

  const checkConditions = () => {
    return conditions.filter(cond => cond.status === false).length <= 0;
  }

  useEffect(() => {
    setAllConditionsChecked(checkConditions(conditions))
  }, [conditions] );

  useEffect(() => {
    if (host) {
      navigation.navigate("HostVerificationCompletedScreen")
    }
  }, [host])


  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <SafeArea>
      <Container showsVerticalScrollIndicator={false}>
        <Text varian="caption" style={{fontSize: 24}}>
          Agree to the terms and conditions
        </Text>
        <Spacer position="bottom" size="large"/>
        <Spacer position="bottom" size="large"/>
        {conditions.map((condition, index) => (
          <View key={`${condition.id}-${index}`}>
            <ConditionContainer onPress={() => updateCondition(index)}>
              <Checkbox
                color={theme.colors.brand.primary}
                status={condition.status ? 'checked' : 'unchecked'}
              />
              <Spacer position="left" size="large"/>
              <View style={{marginTop: 5}}>
                <Text>{condition.description}</Text>
              </View>
            </ConditionContainer>
            <Spacer position="bottom" size="large"/>
          </View>
        ))}
      </Container>
      <ButtonContainer
        style={theme.shadows.default}
      >
        <ActionButton
          height={55}
          onPress={() => onBecomeHost().then(res => setHost(res))}
          disabled={!allConditionsChecked}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Agree and proceed
          </Text>
        </ActionButton>
      </ButtonContainer>
    </SafeArea>
  )
}
