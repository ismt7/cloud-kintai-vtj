/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getAppConfig } from "../graphql/queries";
import { updateAppConfig } from "../graphql/mutations";
export default function AppConfigUpdateForm(props) {
  const {
    id: idProp,
    appConfig: appConfigModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    workStartTime: "",
    workEndTime: "",
    officeMode: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [workStartTime, setWorkStartTime] = React.useState(
    initialValues.workStartTime
  );
  const [workEndTime, setWorkEndTime] = React.useState(
    initialValues.workEndTime
  );
  const [officeMode, setOfficeMode] = React.useState(initialValues.officeMode);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = appConfigRecord
      ? { ...initialValues, ...appConfigRecord }
      : initialValues;
    setName(cleanValues.name);
    setWorkStartTime(cleanValues.workStartTime);
    setWorkEndTime(cleanValues.workEndTime);
    setOfficeMode(cleanValues.officeMode);
    setErrors({});
  };
  const [appConfigRecord, setAppConfigRecord] =
    React.useState(appConfigModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getAppConfig.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAppConfig
        : appConfigModelProp;
      setAppConfigRecord(record);
    };
    queryData();
  }, [idProp, appConfigModelProp]);
  React.useEffect(resetStateValues, [appConfigRecord]);
  const validations = {
    name: [{ type: "Required" }],
    workStartTime: [],
    workEndTime: [],
    officeMode: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          workStartTime: workStartTime ?? null,
          workEndTime: workEndTime ?? null,
          officeMode: officeMode ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateAppConfig.replaceAll("__typename", ""),
            variables: {
              input: {
                id: appConfigRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AppConfigUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              workStartTime,
              workEndTime,
              officeMode,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Work start time"
        isRequired={false}
        isReadOnly={false}
        value={workStartTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              workStartTime: value,
              workEndTime,
              officeMode,
            };
            const result = onChange(modelFields);
            value = result?.workStartTime ?? value;
          }
          if (errors.workStartTime?.hasError) {
            runValidationTasks("workStartTime", value);
          }
          setWorkStartTime(value);
        }}
        onBlur={() => runValidationTasks("workStartTime", workStartTime)}
        errorMessage={errors.workStartTime?.errorMessage}
        hasError={errors.workStartTime?.hasError}
        {...getOverrideProps(overrides, "workStartTime")}
      ></TextField>
      <TextField
        label="Work end time"
        isRequired={false}
        isReadOnly={false}
        value={workEndTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              workStartTime,
              workEndTime: value,
              officeMode,
            };
            const result = onChange(modelFields);
            value = result?.workEndTime ?? value;
          }
          if (errors.workEndTime?.hasError) {
            runValidationTasks("workEndTime", value);
          }
          setWorkEndTime(value);
        }}
        onBlur={() => runValidationTasks("workEndTime", workEndTime)}
        errorMessage={errors.workEndTime?.errorMessage}
        hasError={errors.workEndTime?.hasError}
        {...getOverrideProps(overrides, "workEndTime")}
      ></TextField>
      <SwitchField
        label="Office mode"
        defaultChecked={false}
        isDisabled={false}
        isChecked={officeMode}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              workStartTime,
              workEndTime,
              officeMode: value,
            };
            const result = onChange(modelFields);
            value = result?.officeMode ?? value;
          }
          if (errors.officeMode?.hasError) {
            runValidationTasks("officeMode", value);
          }
          setOfficeMode(value);
        }}
        onBlur={() => runValidationTasks("officeMode", officeMode)}
        errorMessage={errors.officeMode?.errorMessage}
        hasError={errors.officeMode?.hasError}
        {...getOverrideProps(overrides, "officeMode")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || appConfigModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || appConfigModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
