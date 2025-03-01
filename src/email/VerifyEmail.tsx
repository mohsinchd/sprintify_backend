import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const SprintifyVerificationEmail = ({
  username = "Sarah",
  userEmail = "sarah@example.com",
  verificationUrl = "https://sprintify.com/verify?token=123456789",
}) => {
  const main = {
    backgroundColor: "#f5f7fa",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  };

  const container = {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "24px 32px",
    borderRadius: "12px",
    maxWidth: "580px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  };

  const text = {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "16px 0",
  };

  const infoBox = {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    borderLeft: "4px solid #6366f1",
    margin: "24px 0",
  };

  const infoText = {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0",
  };

  const footerText = {
    color: "#9ca3af",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "8px 0",
  };

  const hr = {
    borderColor: "#e5e7eb",
    margin: "28px 0",
  };

  return (
    <Html>
      <Head />
      <Preview>Verify your email to get started with Sprintify</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading
            style={{
              color: "#111827",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "1.3",
              margin: "16px 0",
              textAlign: "center",
            }}
          >
            Welcome to Sprintify!
          </Heading>
          <Text
            style={{
              color: "#6366f1",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "1.4",
              margin: "0 0 24px",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Verify your email to get started
          </Text>

          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            Thanks for creating a Sprintify account! We're excited to have you
            join our community of teams who use Sprintify to streamline their
            projects and boost productivity.
          </Text>

          <Section>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#6366f1",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                textAlign: "center",
                display: "block",
                padding: "14px 24px",
                margin: "32px auto",
                width: "220px",
                transition: "all 0.2s",
              }}
            >
              Verify My Email
            </Button>
          </Section>

          <Text style={text}>Or verify using this link:</Text>

          <div
            style={{
              background: "#f5f7fa",
              borderRadius: "5px",
              padding: "12px 20px",
              margin: "20px 0",
              border: "1px solid #e5e7eb",
              fontFamily: "monospace",
              fontSize: "14px",
              textAlign: "center",
              letterSpacing: "0.25em",
              color: "#374151",
            }}
          >
            {verificationUrl}
          </div>

          <div style={infoBox}>
            <Text style={infoText}>
              <strong>Note:</strong> This verification link will expire in 24
              hours. If you didn't sign up for a Sprintify account, you can
              safely ignore this email.
            </Text>
          </div>

          <Hr style={hr} />

          <Text style={text}>
            After verifying your email, you'll be able to:
          </Text>

          <ul>
            <li style={text}>Create and manage projects</li>
            <li style={text}>Invite team members to collaborate</li>
            <li style={text}>Track progress with our intuitive dashboard</li>
            <li style={text}>Set up automated workflows</li>
          </ul>

          <Text style={text}>
            We can't wait to see what you'll accomplish with Sprintify!
          </Text>

          <Hr style={hr} />

          <footer
            style={{
              textAlign: "center",
              margin: "32px 0 0",
            }}
          >
            <Text style={footerText}>
              © 2025 Sprintify Inc. All rights reserved.
            </Text>
            <Text style={footerText}>
              123 Startup Street, San Francisco, CA 94107
            </Text>
          </footer>
        </Container>
      </Body>
    </Html>
  );
};

export default SprintifyVerificationEmail;
