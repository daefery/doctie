import { Box } from "@chakra-ui/react"
import BannerSection from "./banner"
import Features from "./features"
import StatisticUser from "./statistic"
import TestimonialUser from "./testimonials"

const LandingPage = () =>{
    return(
        <Box paddingBottom={75}>
            <Box paddingLeft={'10%'} paddingRight={'10%'}>
                <BannerSection/>
                <Features/>
            </Box>
            <TestimonialUser/>
            <Box paddingLeft={'10%'} paddingRight={'10%'}>
            <StatisticUser/>
            </Box>
        </Box>
    )
}

export default LandingPage