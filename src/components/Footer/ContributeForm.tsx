import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import CloseIcon from "@mui/icons-material/Close";
import ReCAPTCHA from "react-google-recaptcha";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import schema from "../../validations/Schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import FormSuccess from "./FormSuccess";


const API_URL = import.meta.env.VITE_API_URL
interface Props {
  onFormClicked: () => void;
}

type FormData = z.infer<typeof schema>;

interface District {
  title: string;
}

interface Province {
  title: string;
  districts: {
    [key: string]: District;
  };
}

interface Provinces {
  [key: string]: Province;
}
export default function ContributeForm({ onFormClicked }: Props) {
  const { t } = useTranslation();
  const categories = t("categories", { returnObjects: true });
  const provinces = t("provinces", { returnObjects: true }) as Provinces;
  const [, setSelectedProvince] = useState<string>("");
  const [districts, setDistricts] = useState<{ [key: string]: District }>({});
  const [showDistrict, setShowDistrict] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);

  const handleProvinceChange = (key: string) => {
    const province = key;
    setValue("district", "");
    setShowDistrict(true);
    setSelectedProvince(province);
    setDistricts(provinces[province].districts);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      number: "",
      category: "",
      province: "",
      district: "",
      city: "",
    },
  });

  const onFormSubmit = async (data: FieldValues) => {
    if (!recaptchaToken) {
      console.error("ReCAPTCHA token is missing.");
      setRecaptchaError(true); // Indicate an error with ReCAPTCHA
      return;
    }
    setRecaptchaError(false); // Reset ReCAPTCHA error state if token exists

    // Include the reCAPTCHA token in your payload or verify it before proceeding
    const payload = {
      ...data,
      recaptchaToken,
    };

    try {
      const response = await axios.post(
        `${API_URL}/add-contact`,
        payload
      );

      if (response.status === 201) {
        reset();
        setFormSuccess(true);
        setRecaptchaToken(null); // Reset reCAPTCHA token
      } else {
        console.error(
          "There was a problem adding the contact: ",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    }
  };

  return (
    <>
      {formSuccess && (
        <FormSuccess
          onResultClicked={() => {
            setFormSuccess(false);
          }}
        />
      )}
      {!formSuccess && (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: "blur(10px)",
              zIndex: 9997,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: { xs: "90%", md: "70%", lg: "80%" },
              margin: "auto",
              zIndex: 9999,
            }}
          >
            <Container
              component={Paper}
              sx={{
                width: { xs: "100%", md: "60%", lg: "60%" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  rowGap: "2rem",
                  marginBottom: "2rem",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      marginTop: "2rem",
                      display: "flex",
                      justifyContent: "space-between",
                      columnGap: "4.5rem",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {t("contribute_form.title")}{" "}
                    </Typography>
                    <Box>
                      <ButtonBase onClick={onFormClicked}>
                        <Box sx={{ display: "flex", gap: "4px" }}>
                          <CloseIcon />
                        </Box>
                      </ButtonBase>
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label={t("fields.name.placeholder")}
                          error={!!errors.name}
                          helperText={
                            !!errors.name ? t(`${errors.name?.message}`) : ""
                          }
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="number"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label={t("fields.number.placeholder")}
                          error={!!errors.number}
                          helperText={
                            !!errors.number
                              ? t(`${errors.number?.message}`)
                              : ""
                          }
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          variant="outlined"
                          fullWidth
                          error={!!errors.category}
                        >
                          <InputLabel id="category_label">
                            {t("fields.category.placeholder")}{" "}
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="category_label"
                            label={t("form_category")}
                            MenuProps={{
                              style: { zIndex: 9999 },
                            }}
                          >
                            {Object.keys(categories).map((key: string) => (
                              <MenuItem key={key} value={key}>
                                {categories[key as keyof typeof categories]}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {!!errors.category
                              ? t(`${errors.category?.message}`)
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="province"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          variant="outlined"
                          fullWidth
                          error={!!errors.province}
                        >
                          <InputLabel id="province_label">
                            {t("fields.province.placeholder")}
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="province_label"
                            label="Choose the province"
                            MenuProps={{
                              style: { zIndex: 9999 },
                            }}
                          >
                            {Object.keys(provinces).map((key: string) => (
                              <MenuItem
                                key={key}
                                value={key}
                                onClick={() => {
                                  handleProvinceChange(key);
                                }}
                              >
                                {
                                  (
                                    provinces[
                                      key as keyof typeof provinces
                                    ] as any
                                  ).title
                                }
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {!!errors.province
                              ? t(`${errors.province?.message}`)
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="district"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          variant="outlined"
                          fullWidth
                          error={!!errors.district}
                          disabled={!showDistrict}
                        >
                          <InputLabel id="district_label">
                            {t("fields.district.placeholder")}{" "}
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="district_label"
                            label={t("fields.district.placeholder")}
                            MenuProps={{
                              style: { zIndex: 9999 },
                            }}
                          >
                            {Object.keys(districts).map(
                              (districtKey: string) => (
                                <MenuItem key={districtKey} value={districtKey}>
                                  {districts[districtKey].title}
                                </MenuItem>
                              )
                            )}
                          </Select>
                          <FormHelperText>
                            {!!errors.district
                              ? t(`${errors.district?.message}`)
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label={t("fields.city.placeholder")}
                          variant="outlined"
                          fullWidth
                          error={!!errors.city}
                          helperText={
                            !!errors.city ? t(`${errors.city?.message}`) : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ReCAPTCHA       
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(token: string | null) => {
                      setRecaptchaToken(token);
                      if (token) {
                        setRecaptchaError(false); // Reset error state when a token is received
                      }
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 0,
                  }}
                >
                  {recaptchaError && (
                    <Typography color="error" variant="caption">
                      Please check the captcha
                    </Typography>
                  )}
                </Box>

                <Button variant="contained" type="submit">
                  {t("contribute_form.submit")}{" "}
                </Button>
              </Box>
            </Container>
          </Box>
        </form>
      )}
    </>
  );
}
