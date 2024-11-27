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

interface UserMessageEmailProps {
    sendFrom: string;
    message: string;
}

export default function SendEmailTo({
    sendFrom,
    message,
}: UserMessageEmailProps) {
    const sendersName = sendFrom.split('@')[0] || "Unknown Sender";

    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Message Received</title>
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
            <Preview>{`New message from ${sendFrom}`}</Preview>
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
                        You've Got a new from {sendFrom}
                    </Heading>
                </Section>
                <Section>
                    <Text style={{ fontSize: "16px", color: "#555" }}>
                        <strong>From:</strong> {sendFrom}
                    </Text>
                    <Text
                        style={{
                            fontSize: "16px",
                            color: "#555",
                            marginTop: "10px",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        <strong>Message:</strong> {message}
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
                        If this message seems suspicious, please ignore it.
                    </Text>
                </Section>
            </Container>
        </Html>
    );
}