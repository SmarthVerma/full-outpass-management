import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from "@react-email/components";
import React from "react";

interface VerificationEmailProps {
  id: string;
  verificationCode: string;
  isStudent: boolean;
}

export default function VerificationEmail({
  id,
  verificationCode,
  isStudent,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verify Your Account</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        {isStudent
          ? `Verify your account and join us, ${id}!`
          : `${id} is asking for your permission to be accounted as faculty`}
      </Preview>
      <Container
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          fontFamily: "'Roboto', Verdana, sans-serif",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Section style={{ textAlign: "center", padding: "20px 0" }}>
          <Heading as="h2" style={{ color: "#333", fontWeight: "600" }}>
            Verify Your Account
          </Heading>
        </Section>
        <Section>
          <Text style={{ fontSize: "16px", color: "#555" }}>
            Hi <strong>{isStudent ? id : "Owner"}</strong>,
          </Text>
          <Text style={{ fontSize: "16px", color: "#555", marginTop: "10px" }}>
            {isStudent ? (
              "Thank you for signing up! Please click the button below to verify your account and complete your registration."
            ) : (
              <>
                <strong>{id}</strong> is requesting to be considered as a faculty member. Please click the button below to confirm your request.
              </>
            )}
          </Text>
        </Section>
        <Section style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            href={`http://localhost:5173/verify/${verificationCode}`}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "10px 20px",
              textDecoration: "none",
              fontSize: "16px",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            {isStudent ? "Verify My Account" : "Confirm Faculty Request"}
          </Button>
        </Section>
        <Section style={{ marginTop: "20px" }}>
          <Text style={{ fontSize: "14px", color: "#aaa", textAlign: "center" }}>
            If you didn’t request this email, you can safely ignore it.
          </Text>
        </Section>
      </Container>
    </Html>
  );
}