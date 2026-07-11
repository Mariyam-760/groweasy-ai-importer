export const buildHeaderMappingPrompt = (headers: string[]) => `
You are an expert CRM data mapping assistant.

Your task is to map CSV column names to the GrowEasy CRM schema.

Available CRM fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:

- Return ONLY valid JSON.
- Keys must be the original CSV headers.
- Values must be one of the CRM fields above.
- If a header doesn't match confidently, use null.
- Do not explain your answer.

CSV Headers:

${headers.join(", ")}

Example output:

{
  "Customer Name": "name",
  "Mail ID": "email",
  "Phone Number": "mobile_without_country_code",
  "Remarks": "crm_note",
  "Owner": "lead_owner"
}
`;