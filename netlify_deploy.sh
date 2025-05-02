#!/bin/bash

# Create deployment directory
mkdir -p netlify_deploy

# Copy necessary files for Netlify deployment
cp -r client netlify_deploy/
cp -r shared netlify_deploy/
cp -r attached_assets netlify_deploy/
cp netlify.toml netlify_deploy/
cp package.json netlify_deploy/
cp tsconfig.json netlify_deploy/
cp postcss.config.js netlify_deploy/
cp tailwind.config.ts netlify_deploy/
cp components.json netlify_deploy/
cp vite.config.ts netlify_deploy/
cp drizzle.config.ts netlify_deploy/

# Create a simplified version of the server to handle form submissions via Netlify functions
mkdir -p netlify_deploy/netlify/functions

# Create the contact form Netlify function
cat > netlify_deploy/netlify/functions/contact-form.js << 'EOL'
exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name, email, and message are required" })
      };
    }

    // Here you would typically send this data to an email service or database
    // For now, we'll just return success
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Message received successfully", 
        id: Date.now() // Generate a dummy ID
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process contact form" })
    };
  }
};
EOL

# Create the updated client API file to point to Netlify function
mkdir -p netlify_deploy/client/src/lib
cat > netlify_deploy/client/src/lib/queryClient.ts << 'EOL'
import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    let error;
    try {
      if (contentType?.includes("application/json")) {
        error = await res.json();
      } else {
        error = await res.text();
      }
    } catch (e) {
      error = "Unknown error";
    }
    throw error;
  }
  return res;
}

export async function apiRequest(
  path: string,
  method: string = "GET",
  body?: any,
  headers: HeadersInit = {}
) {
  // For contact form, use Netlify function
  if (path === "/api/contact" && method === "POST") {
    path = "/.netlify/functions/contact-form";
  }
  
  const res = await fetch(path, {
    method,
    credentials: "include",
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  await throwIfResNotOk(res);

  // Check if the response has content before trying to parse it
  const contentLength = res.headers.get("Content-Length");
  if (contentLength === "0") {
    return null;
  }

  const contentType = res.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return res.json();
  }

  return res.text();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => (
  context: any
) => Promise<T> = (options) => async (context) => {
  try {
    // Combine the queryKey (which is the path) with any params
    const [firstKey, ...restKeys] = context.queryKey;
    const path = firstKey + (restKeys.length ? "/" + restKeys.join("/") : "");
    return await apiRequest(path);
  } catch (e: any) {
    if (e?.status === 401 && options.on401 === "returnNull") {
      return null as T;
    }
    throw e;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
EOL

echo "Deployment files prepared in the netlify_deploy directory"
echo "You can now download this directory as a zip file and upload it to Netlify"
