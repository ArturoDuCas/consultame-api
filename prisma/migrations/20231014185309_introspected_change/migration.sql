-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "street_line_1" VARCHAR(255),
    "street_line_2" VARCHAR(255),
    "city" VARCHAR(100),
    "state_province_region" VARCHAR(100),
    "postal_code" VARCHAR(20),
    "country" VARCHAR(100),
    "additional_info" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "address_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "allergy_type_id" INTEGER,

    CONSTRAINT "allergy_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergy_type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(100) NOT NULL,

    CONSTRAINT "allergy_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chronic_disease" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "chronic_disease_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "date" DATE,
    "user_id" INTEGER NOT NULL,
    "doctor_id" INTEGER,
    "hospital_id" INTEGER,

    CONSTRAINT "consultation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation_drug" (
    "consulation_id" INTEGER NOT NULL,
    "drug_id" INTEGER NOT NULL,

    CONSTRAINT "consultation_drug_pk" PRIMARY KEY ("consulation_id","drug_id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "contact_name" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "email" VARCHAR(255),
    "relationship_id" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "contacts_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "doctor_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_hospital" (
    "doctor_id" INTEGER NOT NULL,
    "hospital_id" INTEGER NOT NULL,

    CONSTRAINT "doctor_hospital_pk" PRIMARY KEY ("doctor_id","hospital_id")
);

-- CreateTable
CREATE TABLE "doctor_speciality" (
    "doctor_id" INTEGER NOT NULL,
    "speciality_id" INTEGER NOT NULL,

    CONSTRAINT "doctor_speciality_pk" PRIMARY KEY ("speciality_id","doctor_id")
);

-- CreateTable
CREATE TABLE "drug" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "drug_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_medical_history" (
    "id" SERIAL NOT NULL,
    "chronic_disaese_id" INTEGER NOT NULL,
    "diagnosis_date" DATE,
    "relationship_id" INTEGER NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "family_medical_history_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habits" (
    "user_id" INTEGER NOT NULL,
    "smoke" BOOLEAN,
    "drink_alcohol" BOOLEAN,
    "other_drugs" BOOLEAN,
    "physical_activity" BOOLEAN,
    "sleep_habits" BOOLEAN,

    CONSTRAINT "habits_pk" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "hospital" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "hospital_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital_speciality" (
    "hospital_id" INTEGER NOT NULL,
    "speciality_id" INTEGER NOT NULL,

    CONSTRAINT "hospital_speciality_pk" PRIMARY KEY ("hospital_id","speciality_id")
);

-- CreateTable
CREATE TABLE "relationship" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "is_relative" BOOLEAN NOT NULL,

    CONSTRAINT "relationship_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sex" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "sex_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speciality" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "speciality_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surgery" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "surgery_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "birth_date" DATE,
    "phone_number" VARCHAR(20),
    "sex_id" INTEGER,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_allergy" (
    "allergy_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_allergy_pk" PRIMARY KEY ("allergy_id","user_id")
);

-- CreateTable
CREATE TABLE "user_chronic_disease" (
    "user_id" INTEGER NOT NULL,
    "chronic_disease_id" INTEGER NOT NULL,
    "diagnosis_date" DATE,

    CONSTRAINT "user_chronic_disease_pk" PRIMARY KEY ("user_id","chronic_disease_id")
);

-- CreateTable
CREATE TABLE "user_drug" (
    "user_id" INTEGER NOT NULL,
    "drug_id" INTEGER NOT NULL,

    CONSTRAINT "user_drug_pk" PRIMARY KEY ("user_id","drug_id")
);

-- CreateTable
CREATE TABLE "user_surgery" (
    "user_id" INTEGER NOT NULL,
    "surgery_id" INTEGER NOT NULL,
    "date" DATE,
    "description" TEXT,

    CONSTRAINT "user_surgery_pk" PRIMARY KEY ("user_id","surgery_id")
);

-- CreateTable
CREATE TABLE "user_vaccine" (
    "user_id" INTEGER NOT NULL,
    "vaccine_id" SERIAL NOT NULL,
    "vaccination_date" DATE,

    CONSTRAINT "user_vaccine_pk" PRIMARY KEY ("user_id","vaccine_id")
);

-- CreateTable
CREATE TABLE "vaccine" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "vaccine_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "allergy_name_key" ON "allergy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "relationship_type_key" ON "relationship"("type");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "allergy" ADD CONSTRAINT "allergy_allergy_type_fk" FOREIGN KEY ("allergy_type_id") REFERENCES "allergy_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_doctor_fk" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_hospital_fk" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultation_drug" ADD CONSTRAINT "consultation_drug_fk_consulation" FOREIGN KEY ("consulation_id") REFERENCES "consultation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultation_drug" ADD CONSTRAINT "consultation_drug_fk_drug" FOREIGN KEY ("drug_id") REFERENCES "drug"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_relationship_fk" FOREIGN KEY ("relationship_id") REFERENCES "relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor_hospital" ADD CONSTRAINT "doctor_hospital_fk_doctor" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor_hospital" ADD CONSTRAINT "doctor_hospital_fk_hospital" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor_speciality" ADD CONSTRAINT "doctor_speciality_fk_doctor" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor_speciality" ADD CONSTRAINT "doctor_speciality_fk_speciality" FOREIGN KEY ("speciality_id") REFERENCES "speciality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_medical_history" ADD CONSTRAINT "family_medical_history_chronic_disaese_fk" FOREIGN KEY ("chronic_disaese_id") REFERENCES "chronic_disease"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_medical_history" ADD CONSTRAINT "family_medical_history_relationship_fk" FOREIGN KEY ("relationship_id") REFERENCES "relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "family_medical_history" ADD CONSTRAINT "family_medical_history_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hospital_speciality" ADD CONSTRAINT "hospital_especiality_fk_hospital" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hospital_speciality" ADD CONSTRAINT "hospital_speciality_fk_speciality" FOREIGN KEY ("speciality_id") REFERENCES "speciality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_sex_fk" FOREIGN KEY ("sex_id") REFERENCES "sex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_allergy" ADD CONSTRAINT "user_allergy_fk_allergy" FOREIGN KEY ("allergy_id") REFERENCES "allergy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_allergy" ADD CONSTRAINT "user_allergy_fk_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_chronic_disease" ADD CONSTRAINT "user_chronic_disease_fk_chronic_disease" FOREIGN KEY ("chronic_disease_id") REFERENCES "chronic_disease"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_chronic_disease" ADD CONSTRAINT "user_chronic_disease_fk_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_drug" ADD CONSTRAINT "user_drug_fk_drug" FOREIGN KEY ("drug_id") REFERENCES "drug"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_drug" ADD CONSTRAINT "user_drug_fk_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_surgery" ADD CONSTRAINT "user_surgery_fk_surgery" FOREIGN KEY ("surgery_id") REFERENCES "surgery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_surgery" ADD CONSTRAINT "user_surgery_fk_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_vaccine" ADD CONSTRAINT "user_vaccine_fk_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_vaccine" ADD CONSTRAINT "user_vaccine_fk_vaccine" FOREIGN KEY ("vaccine_id") REFERENCES "vaccine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
