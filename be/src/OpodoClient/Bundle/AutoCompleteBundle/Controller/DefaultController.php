<?php

namespace OpodoClient\Bundle\AutoCompleteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/autocomplete/{keyword}")
     */
    public function indexAction($keyword)
    {
        /*
         * $number = rand(0, 100);
        $data = array(
            'lucky_number' => rand(0, 100),
        );

        return new Response(
            json_encode($data),
            200,
            array('Content-Type' => 'application/json')
        );*/
        //return $this->render('OpodoClientBundleAutoCompleteBundle:Default:index.html.twig');

        // make a service for that
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://www.opodo.de/travel/service/geo/autocomplete;searchWord=".$keyword.";departureOrArrival=DEPARTURE;addSearchByCountry=true;addSearchByRegion=true;product=FLIGHT",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return new JsonResponse($response);
        }
    }
}
