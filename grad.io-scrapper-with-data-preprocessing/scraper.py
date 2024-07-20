from abc import ABC, abstractmethod
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import pandas as pd
from bs4 import BeautifulSoup

class Scraper(ABC):
    def __init__(self, driver_path):
        self.driver_path = driver_path

    @abstractmethod
    def scrape(self, url, keyword):
        pass

    @abstractmethod
    def save_to_excel(self, scraped_data, excel_file):
        pass

    @abstractmethod
    def save_to_text(self, scraped_data, text_file):
        pass

    @abstractmethod
    def save_rejected_urls(self, rejected_urls, rejected_file):
        pass

class MyScraper(Scraper):
    def scrape(self, url, keyword):
        chrome_options = Options()
        service = Service(self.driver_path)
        driver = webdriver.Chrome(service=service, options=chrome_options)

        try:
            driver.get(url)
            page_content = driver.page_source
            soup = BeautifulSoup(page_content, 'html.parser')

            # Find header and footer elements and remove them
            header = soup.find('header')
            footer = soup.find('footer')

            if header:
                header.decompose()
            if footer:
                footer.decompose()

            body_tag = soup.find('body')

            if body_tag:
                body_content = body_tag.get_text()

                if keyword.lower() in body_content.lower():
                    return {'URL': url, 'Keyword': keyword, 'Text': body_content}
            return None

        except NoSuchElementException as e:
            return None

        finally:
            driver.quit()

    def save_to_excel(self, scraped_data, excel_file):
        if scraped_data:
            final_df = pd.DataFrame([scraped_data])
            try:
                existing_df = pd.read_excel(excel_file)
                final_df = pd.concat([existing_df, final_df], ignore_index=True)
            except FileNotFoundError:
                pass

            final_df.to_excel(excel_file, index=False)
            print(f"Scraped data saved to {excel_file}")
        else:
            print("No data found for the specified keyword")

    def save_to_text(self, scraped_data, text_file):
        if scraped_data:
            cleaned_text = scraped_data['Text'].strip()  # Remove extra spaces
            with open(text_file, 'a', encoding='utf-8') as file:
                file.write(f"URL: {scraped_data['URL']}\n")  
                file.write(cleaned_text + '\n\n')  
            print(f"Scraped data saved to {text_file}")
        else:
            print("No data found for the specified keyword.")

    def save_rejected_urls(self, rejected_urls, rejected_file):
        if rejected_urls:
            with open(rejected_file, 'w', encoding='utf-8') as file:
                for url in rejected_urls:
                    file.write(url + '\n')
            print(f"Rejected URLs saved to {rejected_file}")
        else:
            print("No rejected URLs to save.")

def read_urls(file_path):
    try:
        with open(file_path, 'r') as file:
            lines = file.read().splitlines()
        return lines
    except FileNotFoundError:
        print(f"File '{file_path}' not found. Returning an empty list.")
        return []

def main():
    driver_path = r"C:\Users\Usman\Desktop\Scrapper\chromedriver-win64\chromedriver.exe"
    url_file = 'urls.txt'

    urls = read_urls(url_file)
    if not urls:
        print("No URLs found in the file.")
        return

    keyword = "%"
    excel_file = 'scraped_data.xlsx'
    text_file = 'scraped_data.txt'
    rejected_file = 'rejected_websites.txt'
    rejected_urls = []

    the_scraper = MyScraper(driver_path)
    for url in urls:
        scraped_data = the_scraper.scrape(url, keyword)
        if scraped_data:
            the_scraper.save_to_excel(scraped_data, excel_file)
            the_scraper.save_to_text(scraped_data, text_file)
        else:
            rejected_urls.append(url)

    the_scraper.save_rejected_urls(rejected_urls, rejected_file)

if __name__ == "__main__":
    main()
