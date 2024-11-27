import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Section,
    Text,
    Container,
} from "@react-email/components";
import React from "react";

// Hardcoded default content as there's no external data
const defaultSendFrom = "faculty-message@juitsolan.xyz";
const defaultUserName = "Student";
const defaultOutpassDetails = "Outpass has been approved. Please check with the hostel office for further details.";

export default function AcceptedOutpassMail() {
    // Static content as no input data is provided
    const sendersName = defaultSendFrom.split('@')[0] || "Unknown Sender";

    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Outpass Accepted</title>
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
            <Preview>{`Outpass Accepted for ${defaultUserName}`}</Preview>
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
                        Your Outpass has been Accepted, {defaultUserName}!
                    </Heading>
                </Section>
                <Section>
                    <Text style={{ fontSize: "16px", color: "#555" }}>
                        <strong>From:</strong> {defaultSendFrom}
                    </Text>
                    <Text
                        style={{
                            fontSize: "16px",
                            color: "#555",
                            marginTop: "10px",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        <strong>Outpass Details:</strong>
                        <br />
                        {defaultOutpassDetails}
                    </Text>
                </Section>
                <Section style={{ marginTop: "20px" }}>
                    <Text
                        style={{
                            fontSize: "14px",
                            color: "#aaa",
                            textAlign: "center",
                        }}
                    >
                        If you have any questions or concerns, feel free to reach out.
                    </Text>
                </Section>
            </Container>
        </Html>
    );
}