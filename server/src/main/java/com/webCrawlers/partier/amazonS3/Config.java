package com.webCrawlers.partier.amazonS3;

//@Configuration
//public class Config {
//    @Value("${cloud.aws.credentials.access-key}")
//    private String awsAccessKey;
//
//    @Value("${cloud.aws.credentials.secret-key}")
//    private String awsSecretKey;
//
//    @Value("${cloud.aws.region.static}")
//    private String region;
//
//    @Primary
//    @Bean
//    public AmazonS3 amazonS3Client() {
//        return AmazonS3ClientBuilder
//                .standard()
//                .withRegion(region)
//                .withCredentials(new AWSStaticCredentialsProvider(
//                        new BasicAWSCredentials(awsAccessKey, awsSecretKey)))
//                .build();
//    }
//}
