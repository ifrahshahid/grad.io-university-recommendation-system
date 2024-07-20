import pandas as pd

keywords = ['BS Business Intelligence and Analytics', 'BS Optometry and Orthoptics', 'BE Computer Systems Engineering', 'BS-Microbiology', 'MDCAT', 'Bachelor of Science in Computer Science', 'BSc Engineering Technology Electronics', 'BSc Engineering Technology Civil', 'BS Library & Information Sciences', 'BS Biological Sciences', 'BEE (Electronics/Telecommunication/Power)', 'Bachelor of Interior Design', 'BS Environmental Science', 'BS Islamic Banking & Finance', 'BSN Generic Program', 'BS (Telecommunication)', 'Business Administration', 'Bachelor of Fashion Design', 'Doctor of Physiotherapy', 'Psychology', 'BS Optometry and Vision Sciences', 'BS Peace & Conflict Studies', 'BS Aviation Management', 'BS in Digital Media Communication', 'Computer Information Systems', 'BS Applied Psychology', 'BS Media Studies (Bachelor in Media Studies)', 'BMS – Media Studies', 'BS – Accounting & Finance (Regular program)', 'Bachelor of Textile Design (BTD)', 'BE Civil Engineering', 'BS Medical Laboratory Technology', 'LLB Programme', 'Bachelor of Electrical Engineering', 'BE Mechanical Engineering', 'BE Electrical (Electronics)', 'Bachelor of Business Administration (BBA-Honors)', 'Information Technology', 'BS (Business Analytics )', 'BS Library & Information Science', 'BS Medical Imaging and Ultrasonography', 'BS Bioinformatics', 'BS Accounting and Finance (BSAF)', 'BS Disaster Preparedness & Management', 'BS (Hons) English Literature', 'BS (Supply Chain Management)', 'BS Food and Science Technology', 'BS Mathematics', 'BS Food Science and Technology', 'BBA', 'BS Nutrition Sciences', 'English (Applied Linguistics)', 'BS Cyber Security (BSCYS)', 'BS English', 'MBBS', 'BS Medical Imaging Technology', 'Bachelor of Mechanical Engineering', 'BS Information Technology', 'BSc Engineering Technology Mechanical', 'Bachelor of Engineering Technology (Computer)', 'Electrical Engineering Technology', 'BS Archaeology', 'Civil Engineering Technology', 'BS Urban & Regional Planning', 'BS Gender Studies', 'BS Zoology', 'FinTech', 'BS Social Sciences', 'BS Business Informatics', 'Bachelor of Science in Psychology', 'BS Industrial Engineering', 'BSSE', 'Bachelor of Graphic Design', 'Bachelor of Biomedical Engineering (BME)', 'BS Philosophy', 'BS Medical Laboratory Sciences', 'BS- Education', 'BDS', 'BS Data Science', 'Software Development', 'MBBS and BDS', 'Bachelor of Professional Studies', 'BS Computer Games Development (BSCGD)', 'BS Disaster Management', 'Pharm-D', 'S Health & Physical Education', 'Undergraduate Admissions', 'BS Speech & Language Pathology', 'BS Operations and Supply Chain Management', 'B.Com', 'BS Physics', 'BBA (Bachelor in Business Administration)', 'B.E. Electrical Engineering', 'BS T & I', 'Required Intermediate', 'Banking and Finance', 'BS Data Science (BSDS)', 'BS Environmental Sciences', 'BE Electrical (Computer Systems)', 'BS – Industrial Management', 'BS (Mathematics)', 'Fine Arts', 'BS Biochemistry', 'Bachelor of Law', 'Bachelor of Sciences in Computer Science', 'BS Journalism and Media Studies', 'BS Nursing', 'Electrical System (Industrial Automation)', 'BS Textiles', 'BS Strategic Studies (BSSS)', 'BS Professional Flight Technology (PFT)', 'BS Geo sciences', 'BS Business Management and Accounting', 'Bachelor of Engineering Technology (Software)', 'LLB', 'Economics', 'BS Tourism & Hotel Management', 'Computer Science', 'BS (Computer Sciences/Mathematics)', 'BS Entrepreneurship', 'BS-Law', 'BS Artificial Intelligence', 'BS PHYSICS', 'Academic Requirements', 'BS Food Safety and Quality Management', 'BS Pashto', 'BS Television Broadcasting & Digital Media', 'BBA / BS (Accounting & Finance / Business Analytics / FinTech)', 'BS (Economics & Finance)', 'Software Engineering', 'BS Bio-Technology', 'BS Geomatics (GIS & Remote Sensing)', 'Mechanical Engineering Technology', 'Information Engineering Technology', 'BS E-Commerce', 'LL.B', 'BA (Hons) in Social Sciences', 'BS Chemistry', 'Business Analytics', 'BS Human Nutrition', 'Management & Business Computing', 'BS Clinical Psychology', 'BS (English)', 'Cyber Security', 'Bachelor of Landscape Architecture', 'BS Cyber Security', 'BS PROJECT & SUPPLY CHAIN', 'BS Botany', 'BS Nutritional Sciences', 'Public Administration', 'BS Microbiology', 'BE Bio-Medical (Spring Program)', 'Bachelor of Sciences in Accounting & Finance', 'BS Civil Engineering', 'B.Ed. (Honours)', 'BE(CE)', 'Bachelor of Architecture', 'Bachelor of Textile Design', 'Admission Requirements', 'Commerce', 'BS (Business & Information Technology)', 'BS Communication and Immersive Media', 'Intermediate', 'BS Statistics', 'BS English (4 Years Program)', 'Electrical Engineering', 'BA (H) Early Childhood Education', 'B.Arch - Bachelor of Architecture', 'BE (Electrical, Electronic and Computer)', 'BS Health Care Management (BSHCM)', 'BS Accounting and Finance', 'BCSE', 'BS Health, Physical Education & Sports Sciences (HPESS)', 'BS Social Work', 'BS (Computing programs)', 'Bachelor of Computer Engineering', 'BS Operation Theatre and Technology', 'BS Regional Studies', 'BS Psychology (BSPsy)', 'BS Physics(BSP)', 'BS Social Anthropology', 'BS Pakistan Studies', 'BE(ME)', 'B.Sc Engineering', 'BS Economics', 'BS Urdu', 'BBIS', 'BS Mass Communication', 'All Degrees', 'BS Journalism & Mass Communication', 'BS Accounting & Finance', 'BS Media & Communication', 'BE(EE)', 'BSE and BCE', 'BS in Media and Communication', 'BS in Plant Biodiversity Conservation and Management', 'Bachelors Programs', 'Doctor of Physical Therapy', 'BS(SE)', 'BS (Islamic Banking & Finance)', 'Electronics Engineering', 'Pharm.D', 'BSc Engineering Technology Electrical', 'BS(AI)', 'BEMS (Bachelor of Eastern Medicine System)', 'BS International Relations', 'BS Criminology', 'Business & Information Technology (BBIT)', 'BS Respiratory Therapy', 'BS (Economics & Mathematics)', 'BS COMPUTER SCIENCES', 'BS (Economics)', 'Automotive Engineering Technology', 'BS Psychology', 'BCA', 'BS Electrical Engineering', 'BS(RIS)', 'BS Mathematics (BSMATH)', 'BS Software Engineering', 'Biochemistry', 'BS Digital Forensics & Cyber Security', 'BS MATHS', 'BS History', 'BS Dental Hygiene', '(Bachelors)', 'BS Hospitality Management', 'Bachelor of Education(BSEDU)', 'BS Arts and Design', 'BS Dairy Science & Technology', 'BS Food Sciences & Technology', 'BS (Social Sciences)', 'BS Tourism and Hospitality Management (BSTHM)', 'BS(CS)', 'Hospitality & Tourism Management', 'BS (Engineering)', 'DPT', 'BS in Geology/Geophysics/Environmental Sciences', 'BS Mechanical Engineering', 'BS (Public Health)', 'BS Human Nutrition and Dietetics', 'BS Emergency and Intensive care Sciences', 'BSIT', 'Bachelor of Media Studies BS(MS)BS(CS)', 'BS (H) in Special Needs Education', 'BS(DS)', 'BS Aviation Management (BSAVM)', 'BS Molecular Biology', 'Artificial intelligence', 'BS (Psychology)', 'BS Information Technology (BSIT)', 'BS Home Economics (for females only)', 'BSc Aircraft Maintenance Technology', 'B.Com Hons', 'BS Tourism and Hospitality', 'BS Commerce', 'Bachelor of Mechatronics Engineering', 'BS-Mathematics', 'BS Educational Psychology', 'BS (Accounting & Finance', 'BE Electrical Engineering', 'Accounting and Finance', 'BS(Cyber Security)', 'ELECTRICAL & BIO MEDICAL ENGINEERING', 'Bachelor of Business Administration', 'BS Digital Systems and Web Technology', 'Doctor of Pharmacy', 'BS Computer Science', 'BS English(BSENG)', 'Sociology', 'Digital Forensics and Cyber Security', 'BS (Accounting and Finance)', 'BS Electronics', 'BSCS', 'BS Development Studies', 'BE Electrical (Power)', 'BS (Hons) English Language and Linguistics', 'BS Accounting', 'BS in Building Design and Construction', 'Doctor of Physical Therapy (DPT)', 'BS Sociology', 'BS Medical Laboratory Technology (MLT)', 'BS City and Regional Planning', 'Computer Networks', 'Bachelor of Sciences in Electrical Engineering', 'Bachelor of Computer Arts', 'Electrical Systems', 'BS Food Science & Technology', 'BS Human Nutrition & Dietetics', 'BS Biotechnology', 'B Architecture', 'BBA (4 Years)', 'BS(IT)', 'BS Artificial Intelligence (BSAI)', 'BS Remote Sensing & GISBSS (Bachelor in Social Sciences)', 'Bio Medical Engineering Technology', 'BS Biotechnology Zoology', 'BS Islamic Studies', 'BS Islamiyat', 'BS (Accounting & Finance)', 'BE Electrical (Electronic)', 'BS Political Science', 'S MB & M (Bachelor in Maritime Business & Management)', 'BS Computer Sciences (BSCS)', 'B. Architecture', 'B.Ed. (Hons)', 'BS Education', 'BS Public Administration', 'BS Criminology and Forensic Sciences', 'Bachelor of Fashion Design (BFD)', 'BS (Artificial Intelligence)', 'BS Electrical Systems', 'BS Geography', 'BS (Software Engineering)', 'BS (Computer Science)', 'BS in Multimedia Arts- Animation', 'Bachelors in Interior', 'Bachelor of Science International Relations (BS-IR)', 'BS English & Applied Linguistics', 'Bachelor of Sciences in Information Engineering  Technology', 'BCSIT', 'Bachelor of Sciences in Software Engineering', 'Bachelor of Engineering Technology (Electronics)']


with open('scraped_data.txt', 'r', encoding='utf-8') as infile:
    data = infile.read()

extracted_data = {}

for section in data.split('URL: ')[1:]:
    url, section_data = section.split('\n', 1)
    url = url.strip()

    if url not in extracted_data:
        extracted_data[url] = {}
        added_keywords = set() 
    for keyword in keywords:
        start_index = 0
        while start_index != -1:
            start_index = section_data.find(keyword, start_index)

            if start_index != -1:
                end_index_percent = section_data.find('%', start_index)
                end_index_word = section_data.find('percent', start_index)

                if end_index_percent != -1 and end_index_word != -1:
                    end_index = min(end_index_percent, end_index_word)
                elif end_index_percent != -1:
                    end_index = end_index_percent
                else:
                    end_index = end_index_word

                if end_index != -1:
                    keyword_length = len(keyword)
                    first_two_words = ' '.join(section_data[start_index:start_index + keyword_length].split()[:0])
                    last_word_with_percentage = section_data[start_index + keyword_length:end_index + 1].split()[-1]
                    relevant_data = f"{first_two_words} ... {last_word_with_percentage}"

                    if keyword not in added_keywords:
                        if keyword in extracted_data[url]:
                            extracted_data[url][keyword].append(relevant_data)
                        else:
                            extracted_data[url][keyword] = [relevant_data]
                        added_keywords.add(keyword)

                    start_index = end_index + 1
                else:
                    print(f"The keyword is Found '{keyword}' in section with URL: '{url}'.")
                    break
            else:
                break

data_list = []
for url, keyword_data in extracted_data.items():
    for keyword, data in keyword_data.items():
        for item in data:
            data_list.append({'URL': url, 'Keyword': keyword, 'Data': item})
df = pd.DataFrame(data_list)

df.to_excel('AllUniversity_data.xlsx', index=False)
