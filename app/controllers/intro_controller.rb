require 'net/http'
require 'net/https'

class IntroController < ApplicationController

	def index
		
	end

	def cobrandSessionToken
		cobrandLogin    = params[:cobrandLogin]
		cobrandPassword = params[:cobrandPassword]
		
		uri = URI.parse(Yodlee_API_URLS["END_POINT"]["serviceBaseUrl"]+Yodlee_API_URLS["END_POINT"]["URL_COBRAND_SESSION_TOKEN"])
		http = Net::HTTP.new(uri.host, uri.port)
		
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		
		if uri.scheme =='https'
			http.use_ssl = true
		end
		
		res = http.post(uri.request_uri,"cobrandLogin=#{cobrandLogin}&cobrandPassword=#{cobrandPassword}")
		render :json =>  {"isValid" => true, "Body" =>res.body}
	end

	def userSessionToken
		login    = params[:login]
		password = params[:password]
		cobSessionToken = params[:cobSessionToken]

		uri = URI.parse(Yodlee_API_URLS["END_POINT"]["serviceBaseUrl"]+Yodlee_API_URLS["END_POINT"]["URL_USER_SESSION_TOKEN"])
		http = Net::HTTP.new(uri.host, uri.port)
		
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		
		if uri.scheme =='https'
			http.use_ssl = true
		end

		res = http.post(uri.request_uri,"login=#{login}&password=#{password}&cobSessionToken=#{cobSessionToken}")
		render :json =>  {"isValid" => true, "Body" => JSON.parse(res.body)}
	end	

	def searchSites
		cobSessionToken = params["cobSessionToken"]
		userSessionToken = params["userSessionToken"]
		siteSearchString = params["siteSearchString"]


		uri = URI.parse(Yodlee_API_URLS["END_POINT"]["serviceBaseUrl"]+Yodlee_API_URLS["END_POINT"]["URL_SEARCH_SITES"])
		http = Net::HTTP.new(uri.host, uri.port)
		
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		
		if uri.scheme =='https'
			http.use_ssl = true
		end

		res = http.post(uri.request_uri,"cobSessionToken=#{cobSessionToken}&userSessionToken=#{userSessionToken}&siteSearchString=#{siteSearchString}")
		render :json =>  {"Body" => res.body }
	end	

	def getSiteLoginForm
		cobSessionToken = params["cobSessionToken"]
		userSessionToken = params["userSessionToken"]
		siteId = params["siteId"]

		uri = URI.parse(Yodlee_API_URLS["END_POINT"]["serviceBaseUrl"]+Yodlee_API_URLS["END_POINT"]["URL_GET_SITE_LOGIN_FORM"])
		http = Net::HTTP.new(uri.host, uri.port)
		
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		
		if uri.scheme =='https'
			http.use_ssl = true
		end

		res = http.post(uri.request_uri, "cobSessionToken=#{cobSessionToken}&userSessionToken=#{userSessionToken}&siteId=#{siteId}")
		render :json =>  {"Body" => res.body}
	end

	def addSiteAccount
		parameters = params["params"]

		uri = URI.parse(Yodlee_API_URLS["END_POINT"]["serviceBaseUrl"]+Yodlee_API_URLS["END_POINT"]["URL_ADD_SITE_ACCOUNT"])
		http = Net::HTTP.new(uri.host, uri.port)
		
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		
		if uri.scheme =='https'
			http.use_ssl = true
		end

		res = http.post(uri.request_uri, parameters)
		render :json =>  {"Body" => res.body}
	end	

	def getItemSummaries
		cobSessionToken = params["cobSessionToken"]
		userSessionToken = params["userSessionToken"]

		uri = URI.parse(Yodlee_API_URLS["END_POINT"]["serviceBaseUrl"]+Yodlee_API_URLS["END_POINT"]["URL_GET_ITEM_SUMMARIES"])
		http = Net::HTTP.new(uri.host, uri.port)
		
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		
		if uri.scheme =='https'
			http.use_ssl = true
		end

		res = http.post(uri.request_uri,"cobSessionToken=#{cobSessionToken}&userSessionToken=#{userSessionToken}")
		render :json =>  {"Body" => res.body}
	end
end
