import React from "react";
import {
  StatCard,
  Title,
  Content,
  Row,
  Item,
  ItemTitle,
  Value,
} from "./CardStyle";

const Card = ({ title, data, city, door, receipt, count, itemCount }) => {
  return (
    <>
      {city &&
        <StatCard>
          <Title>{title}</Title>
          <Content>
              <Row>
                <Item>
                  <ItemTitle>Grad :</ItemTitle>
                  <Value>{data?.city}</Value>
                </Item>
                <Item>
                  <ItemTitle>Broj prodaja :</ItemTitle>
                  <Value>{data?.count}</Value>
                </Item>
              </Row>
          </Content>
        </StatCard>
        }
        {itemCount &&
        <StatCard>
          <Title>{title}</Title>
          <Content>
            {data.map((item) =>
              <Row>
                 <Item>
                              <ItemTitle>Tip artikla :</ItemTitle>
                              <Value>{item?.value}</Value>
                            </Item>
                            <Item>
                              <ItemTitle>Broj :</ItemTitle>
                              <Value>{item?.quantity}</Value>
                            </Item>
                          </Row>
            )}
          </Content>
        </StatCard>
        }
        {door &&
        <StatCard>
          <Title>{title}</Title>
          <Content>
          <Row>
                <Item>
                  <ItemTitle>Naziv :</ItemTitle>
                  <Value>{data?.name}</Value>
                </Item>
                <Item>
                  <ItemTitle>Broj prodaja :</ItemTitle>
                  <Value>{data?.count}</Value>
                </Item>
              </Row>
          </Content>
        </StatCard>
      }
      {count &&
        <StatCard>
          <Title>{title}</Title>
          <Content>
            <Row count={true}>
              <Item count={true}>
                <Value count={true}>{data}</Value>
              </Item>
            </Row>
          </Content>
        </StatCard>
      }
      {receipt &&
        <StatCard>
          <Title>{title}</Title>
          <Content>
          <Row>
                <Item>
                  <ItemTitle>Datum prodaje :</ItemTitle>
                  <Value>{data?.sold}</Value>
                </Item>
                <Item>
                  <ItemTitle>Lokacija :</ItemTitle>
                  <Value>{data?.buyer?.city}</Value>
                </Item>
              </Row>
          </Content>
        </StatCard>
      }
    </>
  );
};

export default Card;
