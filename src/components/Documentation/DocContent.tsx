import React from 'react';
import { CodeBlock } from './CodeBlock';
import './DocContent.css';

interface DocContentProps {
  section: string;
}

const content: Record<string, { title: string; content: React.ReactNode }> = {
  quickstart: {
    title: 'Quickstart Guide',
    content: (
      <>
        <p>
          Get started with ProConnect Tax APIs in minutes. This guide will walk
          you through generating your first API key and making your first API call.
        </p>
        <h2>Step 1: Generate an API Key</h2>
        <p>
          Navigate to the API Keys section and generate a new API key. Make sure
          to select the appropriate scopes for your integration needs.
        </p>
        <h2>Step 2: Make Your First Request</h2>
        <p>Use your API key to authenticate requests:</p>
        <CodeBlock
          language="javascript"
          code={`// Example: Fetch all tax returns
const response = await fetch('https://api.proconnect.intuit.com/v2/returns', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const returns = await response.json();
console.log(returns);`}
        />
        <h2>Step 3: Handle Responses</h2>
        <p>
          All API responses are in JSON format. Check the status code and handle
          errors appropriately.
        </p>
      </>
    ),
  },
  authentication: {
    title: 'Authentication',
    content: (
      <>
        <p>
          ProConnect Tax APIs use API key authentication. Include your API key in
          the Authorization header of every request.
        </p>
        <h2>API Key Format</h2>
        <p>Your API key should be prefixed with "Bearer":</p>
        <CodeBlock
          language="curl"
          code={`curl https://api.proconnect.intuit.com/v2/returns \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
        />
        <h2>Scopes</h2>
        <p>
          API keys are created with specific scopes that determine what actions
          they can perform. Always use the principle of least privilege when
          selecting scopes.
        </p>
        <div className="doc-callout doc-callout-warning">
          <strong>Security Best Practice:</strong> Never commit API keys to
          version control. Store them securely as environment variables.
        </div>
      </>
    ),
  },
  webhooks: {
    title: 'Webhooks',
    content: (
      <>
        <p>
          Webhooks allow you to receive real-time notifications when events occur
          in ProConnect Tax.
        </p>
        <h2>Setting Up Webhooks</h2>
        <p>Configure your webhook endpoint URL in the API Keys section.</p>
        <CodeBlock
          language="python"
          code={`from flask import Flask, request

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    data = request.json
    event_type = data.get('event_type')
    
    if event_type == 'return.accepted':
        # Handle return acceptance
        return_id = data.get('return_id')
        print(f"Return {return_id} was accepted")
    
    return {'status': 'ok'}, 200`}
        />
        <h2>Event Types</h2>
        <ul>
          <li>
            <code>return.accepted</code> - A tax return was accepted
          </li>
          <li>
            <code>return.rejected</code> - A tax return was rejected
          </li>
          <li>
            <code>client.updated</code> - Client information was updated
          </li>
        </ul>
      </>
    ),
  },
  returns: {
    title: 'Tax Returns API',
    content: (
      <>
        <h2>Get All Returns</h2>
        <CodeBlock
          language="javascript"
          code={`const response = await fetch(
  'https://api.proconnect.intuit.com/v2/returns?status=filed',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}
        />
        <h2>Get a Specific Return</h2>
        <CodeBlock
          language="javascript"
          code={`const response = await fetch(
  'https://api.proconnect.intuit.com/v2/returns/{returnId}',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}
        />
      </>
    ),
  },
  clients: {
    title: 'Client Sync API',
    content: (
      <>
        <h2>List Clients</h2>
        <CodeBlock
          language="python"
          code={`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.proconnect.intuit.com/v2/clients',
    headers=headers
)

clients = response.json()`}
        />
      </>
    ),
  },
  documents: {
    title: 'Document Bridge API',
    content: (
      <>
        <h2>Upload a Document</h2>
        <CodeBlock
          language="javascript"
          code={`const formData = new FormData();
formData.append('file', fileBlob);
formData.append('clientId', '12345');
formData.append('returnId', '67890');

const response = await fetch(
  'https://api.proconnect.intuit.com/v2/documents/upload',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  }
);`}
        />
      </>
    ),
  },
  'best-practices': {
    title: 'Best Practices',
    content: (
      <>
        <h2>Error Handling</h2>
        <p>Always check response status codes and handle errors gracefully:</p>
        <CodeBlock
          language="javascript"
          code={`try {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Handle error appropriately
}`}
        />
        <h2>Rate Limiting</h2>
        <p>
          API requests are rate-limited. Implement exponential backoff when you
          receive 429 (Too Many Requests) responses.
        </p>
        <div className="doc-callout doc-callout-info">
          <strong>Rate Limits:</strong> 100 requests per minute per API key
        </div>
        <h2>Data Pagination</h2>
        <p>
          Use pagination parameters when fetching large datasets to avoid
          performance issues.
        </p>
      </>
    ),
  },
};

export const DocContent: React.FC<DocContentProps> = ({ section }) => {
  const sectionContent = content[section] || content.quickstart;

  return (
    <div className="doc-content">
      <h1 className="doc-content-title">{sectionContent.title}</h1>
      <div className="doc-content-body">{sectionContent.content}</div>
    </div>
  );
};
