const getEnv = (envKey: string) => {
  const environmentVariable = process.env[envKey];

  if (!environmentVariable) {
    throw new Error(`No environment variable named ${envKey} found`);
  }

  return environmentVariable;
};

export default {
  PORT: getEnv('PORT')
};
